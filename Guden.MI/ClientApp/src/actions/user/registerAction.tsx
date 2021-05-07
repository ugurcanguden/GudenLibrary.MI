import axios from 'axios';
import {API_BASE,axiosConfig} from '../../config/env';



export const REGISTER_FULFILLED="REGISTER_FULFILLED";
export const REGISTER_REJECTED="REGISTER_REJECTED";
export const REGISTER_PENDING="REGISTER_PENDING";

export const  Register = (params: any) => {

    
    return  (dispatch: (arg0: { type: string; payload: Promise<any>; }) => void)=>{
            dispatch({
                type:"REGISTER",
                payload: 
                axios.post(`${API_BASE}/Auth/Register`, JSON.stringify(params),axiosConfig)
                .then(result => result.data)
              });
    }
}
