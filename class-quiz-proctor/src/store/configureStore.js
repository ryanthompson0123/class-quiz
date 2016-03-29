import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import remoteActionMiddleware from '../middleware/remoteActionMiddleware';

export default function configureStore(socket, initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, remoteActionMiddleware(socket), createLogger({ collapsed: true })),
            DevTools.instrument()
            )
        );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}