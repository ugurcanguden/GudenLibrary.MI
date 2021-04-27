import {combineReducers} from 'redux';
import product from './products';
import auth from "./auth";

export default combineReducers({
    product,
    auth
})
