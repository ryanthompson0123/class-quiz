import { List, Map, fromJS } from 'immutable';
import moment from 'moment';
import fs from 'fs';

const WAITING_TO_START_STEP = 'waiting';
const QUESTION_STEP = 'questionStep';
const ANSWERS_STEP = 'answersStep';
const STATS_STEP = 'statsStep';
const RESULTS_STEP = 'resultsStep';

export const INITIAL_STATE = Map({
    players: Map()
});

// export function addQuiz(state,newQuiz){
    
//     const newState = state.update('quizzes',quizList=> {
//         return quizList.push(newQuiz));
//     }

//      writeOutQuizzes(newState);

//     return  newState;
// }

export function loadQuizzes(state, quizzes) {
    const iQuizzes = fromJS(quizzes);
    
    return state.set('quizzes', iQuizzes);
}

export function saveQuiz(state, quiz, index) {
    const newState = state.setIn(['quizzes', index], quiz);
    
    writeOutQuizzes(newState);
    
    return newState;
}

export function deleteQuiz(state, index) {
    const newState = state.deleteIn(['quizzes', index]);
    
    writeOutQuizzes(newState);
    
    return newState;
}

function writeOutQuizzes(state) {
    const quizJs = state.get('quizzes').toJS();
    const quizJsPretty = JSON.stringify(quizJs, null, 2);
    
    fs.writeFile("quizzes.json", quizJsPretty, err => {
        if (err) {
            return console.log(err);
        }
        
        console.log("Updated quizzes file.");
    });
}

export function join(state, playerState, playerName, socket) {
    console.log(playerName + ' joined the match');
    
    const newPlayerState = playerState.set('playerName', playerName);
    
    // TODO: If there's a running quiz, add the player to the running quiz.
    
    return state
        .update('runningQuiz', runningQuiz => joinQuiz(runningQuiz, newPlayerState, socket))
        .setIn(['players', socket.id], newPlayerState);
}

export function proctorJoin(state, socket) {
    console.log('The proctor joined the match');
    
    return state.set('proctor', socket.id);
}

export function leave(state, socket) {
    return state.removeIn(['players', socket.id]);
}

function createRunningAnswer(answer, index) {
    return answer.set('id', index);
}

function createRunningQuestion(question, index) {
    return question
        .update('possibleAnswers', answers => answers.map(createRunningAnswer))
        .set('responses', List())
        .set('number', index + 1);
}

function joinQuiz(quiz, playerState, socket) {
    if (!quiz) return quiz;
    
    return quiz.update('scores', scores => scores.set(socket.id, createScore(playerState)));
}

function createScore(playerState) {
    console.log(playerState);
    const { playerName } = playerState;
    
    return Map({
        player: playerName,
        score: 0,
        avgResponse: 0,
        correctAnswers: 0,
        rank: 1
    });
}

function createRunningQuiz(quiz, playerStates) {
    // TODO: Make the question order random.
    const questionSet = 
        quiz
        .get('questions')
        .map(createRunningQuestion)
        .reverse();
    
    const scores =
        playerStates
        .map(createScore);
        
    return Map({
        title: quiz.get('title'),
        remainingQuestions: questionSet,
        askedQuestions: List(),
        scores: scores,
        currentStep: WAITING_TO_START_STEP
    });
}

export function startQuiz(state, quiz) {
    console.log('starting quiz "' + quiz.get('title') + '"');
    const { players } = state;
    return state.set('runningQuiz', createRunningQuiz(quiz, players));
}

function killPlayerQuizzes(players) {
    return players.map(player => {
        return player
            .remove('question')
            .remove('selectedAnswer')
            .remove('correctAnswer')
            .remove('results');
    });
}

export function exitQuiz(state) {
    console.log('Ending Match');
    return state
        .remove('runningQuiz')
        .update('players', players => killPlayerQuizzes(players));
}

function removePreviousResponse(questionState, socketId) {
    const responses = questionState.get('responses');
    
    if (!responses) return questionState;
    
    const previousResponse = 
        responses
        .findEntry(response => {
            console.log(response);
            return response.get('playerId') == socketId;
        });
        
    if (previousResponse) {
        return questionState.update('responses', responses => responses.remove(previousResponse[0]));
    } else {
        return questionState;
    }
}

function getResponseTime(questionState) {
    const now = moment();
    const asked = moment(questionState.get('askedAt'));
    
    console.log(asked);
    const time = now.diff(asked, 'seconds', true);
    
    const response = (Math.round(time * 10) / 10).toFixed(1);
    
    console.log(response);
    return response;
}

function isCorrect(questionState, selectedAnswer) {
    console.log(questionState);
    const correctAnswer = 
        questionState
        .get('possibleAnswers')
        .find(answer => answer.get('text') == selectedAnswer.text && answer.get('isCorrect'));
        
    return correctAnswer ? true : false;
}

function getPoints(correctAnswer, responseTime) {
    if (correctAnswer) {
        return 150 / (Math.log(2 * responseTime + 1)) + 25;
    } else {
        return 25 / (Math.log(2 * responseTime +1)) - 5;
    }
}

function setResponse(questionState, playerState, answer, socketId) {
    const responseTime = getResponseTime(questionState);
    const { playerName } = playerState;
    const correct = isCorrect(questionState, answer);
    const points = getPoints(correct, responseTime);

    const response = Map({
        playerId: socketId,
        playerName: playerName,
        answer: answer,
        responseTime: responseTime,
        isCorrect: correct,
        points: points
    });
    
    return questionState
        .update('responses', responses => responses.push(response));
}

export function respond(questionState, playerState, answer, socketId) {
    const newPlayerState = playerState.set('selectedAnswer', answer);
    
    return setResponse(
        removePreviousResponse(questionState, socketId),
        newPlayerState,
        answer,
        socketId,
    );
}

function updateStats(quizState) {
    const responses = quizState.getIn(['currentQuestion', 'responses']);
    const scores = quizState.get('scores');
    console.log('scores');
    console.log(scores);
    const num = quizState.getIn(['currentQuestion', 'number']);
    
    let scoreList = responses.map(response => {
        console.log('next response');
        console.log(response);
        
        let { playerId, isCorrect, points, responseTime } = response;
        let nextScore = scores.get(playerId);
        
        console.log('next score');
        console.log(nextScore);
        if (!nextScore) {
            nextScore = Map();
        }
        
        nextScore = nextScore
            .update('score', score => {
                console.log('current score');
                console.log(score);
                console.log('points earned');
                console.log(points);
                return score + points;
            })
            .update('avgResponse', avgResponse => avgResponse * (num - 1) / num + responseTime / num)
            .update('correctAnswers', correctAnswers => isCorrect ? correctAnswers + 1 : correctAnswers)
            .set('playerId', playerId);
        
        console.log('next score');
        console.log(nextScore.get('score'));
        
        return nextScore;
    });
    
    let finalQuizState = quizState;
    
    console.log('score list');
    console.log(scoreList);
    
    scoreList
        .sortBy(score => score.get('score'))
        .reverse()
        .map((score, index) => score.set('rank', index + 1))
        .forEach(score => finalQuizState = finalQuizState.setIn(['scores', score.get('playerId')], score));
        
    console.log('final quiz state');
    console.log(finalQuizState);
    return finalQuizState;
}

function nextQuizState(quizState) {
    const currentStep = quizState.get('currentStep');
    const { currentQuestion, remainingQuestions } = quizState;
    
    if (currentStep == RESULTS_STEP) {
        // TODO:
        return quizState;    
    }
    
    if (currentStep == WAITING_TO_START_STEP) {
        // Get the first question and set it as the current question.
        const nextQuestion = remainingQuestions.last();
        
        return quizState
            .set('currentStep', QUESTION_STEP)
            .set('currentQuestion', nextQuestion)
            .update('remainingQuestions', qList => qList.pop())
            .setIn(['currentQuestion', 'askedAt'], moment());
    }
    
    if (currentStep == STATS_STEP) {
        // Get the next question and current question.
        const nextQuestion = remainingQuestions.last();

        // Move the current question into the 'asked questions', and
        // set the next question as the current question.
        return quizState
            .set('currentStep', QUESTION_STEP)
            .update('askedQuestions', qList => qList.push(currentQuestion))
            .set('currentQuestion', nextQuestion)
            .update('remainingQuestions', qList => qList.pop())
            .setIn(['currentQuestion', 'askedAt'], moment());
    }
    
    if (currentStep == ANSWERS_STEP) {
        // Update all the statistics.
        const stateWithStats = updateStats(quizState);
        
        if (remainingQuestions.count() == 0) {
            // Move the current question into the 'asked questions'
            return stateWithStats
                .set('currentStep', RESULTS_STEP)
                .update('askedQuestions', qList => qList.push(currentQuestion))
                .set('currentQuestion', null);
        }
        
        // More questions, so just show the stats for the last question.
        return stateWithStats
            .set('currentStep', STATS_STEP);
    }
    
    // Already in question step, so moving to answers step.
    return quizState
        .set('currentStep', ANSWERS_STEP);
}

function updatePlayerQuestion(player, socketId, newQuizState) {
    const { currentQuestion } = newQuizState;
    return player
        .set('question', currentQuestion.remove('responses'))
        .remove('correctAnswer')
        .remove('stats');
}

function updatePlayerStats(player, socketId, newQuizState) {
    const responses = newQuizState.getIn(['currentQuestion', 'responses']);
    const scores = newQuizState.get('scores');
    
    const myResponse = responses
        .find(response => response.get('playerId') == socketId);
    const myScore = scores.get(socketId);
    
    const pointsEarned = myResponse ? myResponse.get('points') : 0;
    const responseTime = myResponse ? myResponse.get('responseTime') : 30;
    const totalScore = myScore.get('score');
    const rank = myScore.get('rank');
    const players = scores.count();
    
    const stats = Map({
        pointsEarned,
        responseTime,
        totalScore,
        rank,
        players
    });
    
    return player
        .set('stats', stats);
}

function updatePlayerResults(player, socketId, newQuizState) {
    const scores = newQuizState.get('scores');
    const myScore = scores.get(socketId);
    
    const rank = myScore.get('rank');
    const players = scores.count();
    const score = myScore.get('score');
    const correctAnswers = myScore.get('correctAnswers');
    const possibleAnswers = newQuizState.get('askedQuestions').count();
    const avgResponse = myScore.get('avgResponse');
    
    const results = Map({
        rank,
        players,
        score,
        correctAnswers,
        possibleAnswers,
        avgResponse
    });
    
    return player
        .set('results', results);
}

function updatePlayerAnswer(player, socketId, newQuizState) {
    const possibleAnswers = newQuizState.getIn(['currentQuestion', 'possibleAnswers']);
    
    console.log('Possible ANswers');
    console.log(possibleAnswers);
    const correctAnswer = possibleAnswers
        .find(answer => answer.get('isCorrect'));
    
    console.log('Correct Answer');
    console.log(correctAnswer); 
    return player
        .set('correctAnswer', correctAnswer);
}

function updatePlayers(players, newQuizState) {
    const { currentStep } = newQuizState;
    console.log('current state');
    console.log(currentStep);
    
    let updater;
    switch (currentStep) {
        case QUESTION_STEP:
            updater = updatePlayerQuestion;
            break;
        case ANSWERS_STEP:
            updater = updatePlayerAnswer;
            break;
        case STATS_STEP:
            updater = updatePlayerStats;
            break;
        case RESULTS_STEP:
            updater = updatePlayerResults;
            break;
    }
    
    return players.map((player, socketId) => updater(player, socketId, newQuizState));
}

export function nextStep(state) {
    const { players, runningQuiz } = state;
    
    const newQuizState = nextQuizState(runningQuiz);
    const newPlayerStates = updatePlayers(players, newQuizState);
    
    return state
        .set('runningQuiz', newQuizState)
        .set('players', newPlayerStates);
}

/*
const quiz = {
    remainingQuestions: [],
    currentQuestion: {
        text: "",
        possibleAnswers: [],
        askedAt: "date-time",
        responses: [
            {
                player: {},
                answer: {},
                responseTime: 2.86,
                points: 10
            }
        ]
    },
    askedQuestions: [],
    scores: {
        playerId: {
            player: {},
            score: 500,
            rank: 10,
            avgResponse: 1.84
        }
    },
    currentStep: 'step'
};
*/