import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

const reducer = combineReducers(reducers);

export default createStore(reducer);
