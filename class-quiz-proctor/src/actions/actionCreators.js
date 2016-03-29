export const SET_STATE = 'SET_STATE';
export const PROCTOR_JOIN = 'PROCTOR_JOIN';
export const EDIT_QUIZ = 'EDIT_QUIZ';
export const START = 'START';
export const DELETE_QUIZ = 'DELETE_QUIZ';
export const NEXT_STEP = 'NEXT_STEP';
export const EXIT_QUIZ = 'EXIT_QUIZ';
export const SAVE_QUIZ = 'SAVE_QUIZ';
export const ADD_QUESTION = 'ADD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION;';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const CHANGE_QUESTION_TEXT = 'CHANGE_QUESTION_TEXT';
export const EDIT_ANSWER = 'EDIT_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const ADD_ANSWER = 'ADD_ANSWER';
export const CHANGE_QUIZ_NAME = 'CHANGE_QUIZ_NAME';

export function setState(state) {
    return {
        type: SET_STATE,
        state
    };
}

export function join() {
    return {
        type: PROCTOR_JOIN,
        meta: { remote: true }
    }; 
}

export function startQuiz(quiz) {
    return {
        type: START,
        meta: { remote: true },
        quiz
    };
}

export function editQuiz(index) {
    return {
        type: EDIT_QUIZ,
        index
    };
}

export function saveQuiz(quiz, index) {
    return {
        type: SAVE_QUIZ,
        meta: { remote: true },
        quiz,
        index
    };
}

export function deleteQuiz(index) {
    return {
        type: DELETE_QUIZ,
        meta: { remote: true },
        index
    };
}

export function nextStep() {
    return {
        type: NEXT_STEP,
        meta: { remote: true }
    };
}

export function exitQuiz() {
    return {
        type: EXIT_QUIZ,
        meta: { remote: true }
    };
}

export function addQuestion() {
    return {
        type: ADD_QUESTION
    };
}

export function editQuestion(index) {
    return {
        type: EDIT_QUESTION,
        index
    };
}

export function deleteQuestion(index) {
    return {
        type: DELETE_QUESTION,
        index
    };
}

export function changeQuizName(newName) {
    return {
        type: CHANGE_QUIZ_NAME,
        newName
    };
}

export function editAnswer(index, text, isCorrect) {
    return {
        type: EDIT_ANSWER,
        index,
        text,
        isCorrect
    };
}

export function deleteAnswer(index) {
    return {
        type: DELETE_ANSWER,
        index
    };
}

export function addAnswer(text) {
    return {
        type: ADD_ANSWER,
        text
    };
}

export function changeQuestionText(index, text) {
    return {
        type: CHANGE_QUESTION_TEXT,
        index,
        text
    };
}