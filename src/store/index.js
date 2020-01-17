import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const reducer = combineReducers(reducers);

export default createStore(
    reducer,
    applyMiddleware(thunk),
    /* eslint-disable-next-line no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
