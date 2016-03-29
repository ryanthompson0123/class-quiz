
export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        action.playerState = store.getState();
        socket.emit('playerAction', action);
    }

    return next(action);
};