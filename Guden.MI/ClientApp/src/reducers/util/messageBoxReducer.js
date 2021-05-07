
import {SETMESSAGEBOXPROPS } from '../../actions/utilComponent/messageBoxAction'; 

const initialState=
{
    isOpen:true,
    isSuccess:false, 
    messageText:"",
    initialSize:"mini",
    header:"",
    redirectUrl:""
}

export default (state=initialState,action)=>
{
    switch (action.type){
        
        case SETMESSAGEBOXPROPS: 
  
            return {
                ...state,
                ...action.payload.data
            }; 
        
        default :
        return state;
    }
}