import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGIN_PENDING
} from "../../actions/user/authAction";
import {setAccessToken} from '../../utils/AccessToken';

const user = JSON.parse(localStorage.getItem("user"));

  const initialState = user
    ? { isLoggedIn: true, user , fetching:false,message:"",isShowMessage:false,success:false}
    : { isLoggedIn: false, user: null , fetching:false,message:"",isShowMessage:false,success:false}

 

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
            fetching:false,
            isShowMessage:true,
            message:action.payload.message,
            success:action.payload.success  
          };
        case LOGIN_REJECTED:
          return {
            ...state,
            isLoggedIn: false,
            user: null,
            fetching:false,
            isShowMessage:true,
            message:action.payload.message,
            success:action.payload.success  
          }; 
          case LOGIN_PENDING:
            return {
              ...state,
              isLoggedIn: false,
              user: null,
              fetching:true,
              isShowMessage:false,
              message:"" 
            }; 
         
          default:
          return state;
      } 

  }