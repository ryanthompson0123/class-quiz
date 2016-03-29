import 'babel-polyfill';
import patchDestructuring from 'extensible-polyfill';
patchDestructuring('immutable');
import makeStore from './src/store';
import { startServer } from './src/server';

const store = makeStore();
startServer(store);

store.dispatch({
    type: 'LOAD_QUIZZES',
    quizzes: require('./quizzes.json')
});