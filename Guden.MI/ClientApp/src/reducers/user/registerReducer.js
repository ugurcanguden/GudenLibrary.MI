
import {
    REGISTER_FULFILLED,
    REGISTER_REJECTED,
    REGISTER_PENDING
  } from "../../actions/user/registerAction";

  const initialState = 
  { 
     requestItems:
                    {
                        isLoggedIn: true,
                        fetching:false
                    },   
    fetching:false,
    isShowMessage:false,
    message:"",
    success:false
                 
  }

    export default (state=initialState,action)=>
    {
        switch (action.type)
        {
            
            case REGISTER_FULFILLED:         
            return {
            ...state,
            fetching:false,
            isShowMessage:true,
            message:action.payload.message,
            success:action.payload.success
            };
 
            case REGISTER_REJECTED:         
            return {
            ...state,
            fetching:false,
            isShowMessage:true,
            message:action.payload.message,
            success:action.payload.success
            };

            case REGISTER_PENDING:         
            return {
            ...state,
            fetching:true
            };

            default:
            return state;
        } 
  
    }