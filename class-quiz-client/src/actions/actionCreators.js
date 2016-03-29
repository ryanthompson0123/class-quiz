export const RESPOND = 'RESPOND';
export const JOIN = 'JOIN';
export const SET_STATE = 'SET_STATE';

export function setState(state) {
    return {
        type: SET_STATE,
        state
    };
}

export function respond(answer) {
    return {
        type: RESPOND,
        meta: { remote: true},
        answer
    };
}

export function join(playerName) {
    return {
        type: JOIN,
        meta: { remote: true },
        playerName
    };
}