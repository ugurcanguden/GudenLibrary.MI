import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGIN_PENDING
} from "../actions/auth";
import setAccessToken from '../utils/setAccessToken';

const user = JSON.parse(localStorage.getItem("user"));

  const initialState = user
    ? { isLoggedIn: true, user , fetching:false}
    : { isLoggedIn: false, user: null , fetching:false}

 

  export default (state=initialState,action)=>
  {
      switch (action.type)
      {
        case LOGIN_FULFILLED:
          if(action.payload.success){
            setAccessToken(action.payload.data.token,true);
          }

          return {
            ...state,
            isLoggedIn: true,
            user: action.payload,
            fetching:false
          };
        case LOGIN_REJECTED:
          return {
            ...state,
            isLoggedIn: false,
            user: null,
            fetching:false
          }; 
          case LOGIN_PENDING:
            return {
              ...state,
              isLoggedIn: false,
              user: null,
              fetching:true
            }; 
          default:
          return state;
      } 

  }