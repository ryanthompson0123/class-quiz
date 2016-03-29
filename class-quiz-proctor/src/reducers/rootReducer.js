import * as ActionTypes from '../actions/actionCreators';
import { Map, fromJS } from 'immutable';
import { addQuestion, deleteQuestion, setQuestionText, setAnswer, deleteAnswer, addAnswer, setQuizName } from '../editCore';

export default function rootReducer(state = Map(), action) {
    switch (action.type) {
        case ActionTypes.SET_STATE:
            console.log('setting state');
            return fromJS(action.state);
        case ActionTypes.START:
            return state;
        case ActionTypes.EDIT_QUIZ:
            return state
                .set('editingQuiz', true)
                .set('editingQuizIndex', action.index)
                .set('editingQuestionIndex', 0);
        case ActionTypes.DELETE_QUIZ:
            return state;
        case ActionTypes.SAVE_QUIZ:
            return state
                .remove('editingQuiz')
                .remove('editingQuestion');
        case ActionTypes.ADD_QUESTION:
            return addQuestion(state);
        case ActionTypes.EDIT_QUESTION:
            return state.set('editingQuestionIndex', action.index);
        case ActionTypes.DELETE_QUESTION:
            return deleteQuestion(state, action.index);
        case ActionTypes.CHANGE_QUESTION_TEXT:
            return setQuestionText(state, action.index, action.text);
        case ActionTypes.EDIT_ANSWER:
            return setAnswer(state, action.index, action.text, action.isCorrect);
        case ActionTypes.DELETE_ANSWER:
            return deleteAnswer(state, action.index);
        case ActionTypes.ADD_ANSWER:
            return addAnswer(state, action.text);
        case ActionTypes.CHANGE_QUIZ_NAME:
            return setQuizName(state, action.newName);
        default:
            return state;
    }
}

