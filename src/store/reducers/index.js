import { combineReducers } from 'redux';
import auth from './reducers/auth';
import card from './reducers/card';
import route from './reducers/route';
import address from './reducers/address';

export default combineReducers({ auth, card, route, address });