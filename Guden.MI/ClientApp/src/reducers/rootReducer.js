import {combineReducers} from 'redux';
import { reducer as forms } from 'redux-form';//redux formları bağladım...
import product from './products';
import auth from "./user/authReducer";
import register from "./user/registerReducer";
import messageBox from "./util/messageBoxReducer";
export default combineReducers({
    product,
    auth,
    register,
    messageBox,
     forms
})





