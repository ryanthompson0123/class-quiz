import Server from 'socket.io';
import Immutable from 'immutable';

function observeStore(store, onChange) {
    let currentState;

    function handleChange() {
        let nextState = store.getState();
        if (nextState !== currentState) {
            onChange(nextState, currentState);
            currentState = nextState;
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

function emitPlayerStateIfChanged(io, player, nextState, currentStates) {
    const currentState = currentStates.get(player);
    
    if (nextState !== currentState) {
        console.log('sending state to player ' + player);
        io.to(player).emit('state', nextState.toJS());
    }
}

function emitToPlayers(io, nextPlayerStates, currentPlayerStates) {
    nextPlayerStates.forEach((v, k) => emitPlayerStateIfChanged(io, k, v, currentPlayerStates));    
}

function emitToProctor(io, nextState) {
    const { proctor } = nextState;
    
    if (proctor) {
        console.log('sending state to proctor');
        console.log(nextState);
        io.to(proctor).emit('state', nextState.toJS());
    }
}

function getDisconnectAction(socket) {
    return {
        type: 'LEAVE',
        socket: socket
    };
}

export function startServer(store) {
    const io = new Server().attach(8090);

    observeStore(store, (nextState, currentState) => {
        if (!currentState || !nextState) return;
        
        emitToPlayers(io, nextState.get('players'), currentState.get('players'));
        emitToProctor(io, nextState);
    });

    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('playerAction', (action) => {
            console.log('player action');
            action.socket = socket;
            if (action.playerState) {
                action.playerState = Immutable.fromJS(action.playerState);
            }
            
            store.dispatch.bind(store)(action);
        });
        
        socket.on('proctorAction', (action) => {
            action.socket = socket;
            
            store.dispatch.bind(store)(action);
        });
        
        socket.on('disconnect', (socket) => {
            const action = getDisconnectAction(socket);
            store.dispatch.bind(store)(action);
        });
    });
}