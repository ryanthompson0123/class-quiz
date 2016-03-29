import * as ActionTypes from '../actions/actionCreators';
import { Map, fromJS } from 'immutable';

export default function rootReducer(state = Map(), action) {
    switch (action.type) {
        case ActionTypes.JOIN:
            return state.set('playerName', action.playerName);
        case ActionTypes.SET_STATE:
            return fromJS(action.state);
        case ActionTypes.RESPOND:
            return state.set('selectedAnswer', action.answer);
        default:
            return state;
    }
}
