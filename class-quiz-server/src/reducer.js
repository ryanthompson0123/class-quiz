import { fromJS } from 'immutable';
import { loadQuizzes, saveQuiz, deleteQuiz, join, proctorJoin, leave, respond, startQuiz, exitQuiz, nextStep, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case 'ADD_QUIZ':
        //     return addQuiz(state,action.newQuiz);
        case 'LOAD_QUIZZES':
            return loadQuizzes(state, action.quizzes);
        case 'UPDATE':
            return state;
        case 'START':
            return startQuiz(state, fromJS(action.quiz));
        case 'EXIT_QUIZ':
            return exitQuiz(state);
        case 'NEXT_STEP':
            return nextStep(state);
        case 'PROCTOR_JOIN':
            return proctorJoin(state, action.socket);
        case 'SAVE_QUIZ':
            return saveQuiz(state, action.quiz, action.index);
        case 'DELETE_QUIZ':
            return deleteQuiz(state, action.index);
        case 'JOIN':
            return join(state, action.playerState, action.playerName, action.socket);
        case 'LEAVE':
            return leave(state, action.socket);
        case 'RESPOND':
            const { playerState, answer, socket } = action;
            
            return state.updateIn(['runningQuiz', 'currentQuestion'],
                            questionState => respond(questionState, playerState, answer, socket.id))
                        .updateIn(['players', socket.id], 
                            player => player.set('selectedAnswer', answer));
    }
    return state;
}