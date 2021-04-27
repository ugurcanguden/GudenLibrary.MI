
import axios from 'axios'
import {API_BASE,axiosConfig} from '../config/env';
export const FETCH_PRODUCTS_FULFILLED="FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED="FETCH_PRODUCTS_REJECTED";
export const FETCH_PRODUCTS_PENDING="FETCH_PRODUCTS_PENDING";

//#region Types..
export type  itemProduct=
{
    productName:String;
    productId:number;
}

export type  productActionResult ={
  
        fecthing:boolean 
        products:itemProduct[]
  
};  


//#endregion



export const  fetchProduct = () => 
{
    return (dispatch: (arg0: { type: string; payload: Promise<any>; }) => void)=>{
            dispatch({
                type:"FETCH_PRODUCTS",
                payload:
                        axios.get(`${API_BASE}/Products/getall`)
                        .then(result=>result.data) 
            })
         
    }
}
