import axios from 'axios'
import {API_BASE,axiosConfig} from '../config/env';

export const LOGIN_FULFILLED="LOGIN_FULFILLED";
export const LOGIN_REJECTED="LOGIN_REJECTED";
export const LOGIN_PENDING="LOGIN_PENDING";


export const  login = (email: string,password: string) => 
{
    var postData = {
      Email: email,
      Password: password
    };
    return  (dispatch: (arg0: { type: string; payload: Promise<any>; }) => void)=>{
            dispatch({
                type:"LOGIN",
                payload: 
                axios.post(`${API_BASE}/Auth/Login`, JSON.stringify(postData),axiosConfig)
                .then(result => result.data)
              });
    }
}


export default { login };