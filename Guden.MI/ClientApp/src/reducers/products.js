
 

import {
    FETCH_PRODUCTS_FULFILLED,
    FETCH_PRODUCTS_REJECTED,
    FETCH_PRODUCTS_PENDING,
} from '../actions/products'

const initialState=
{
    fetching:false,
    products:[]
}

export default (state=initialState,action)=>
{
    switch (action.type){
        
        case FETCH_PRODUCTS_PENDING: 
  
            return {
                ...state,
                fetching:true
            };
        case FETCH_PRODUCTS_FULFILLED: 
     
            return {
                ...state,
                fetching:false,
                products:action.payload.data
            };
        case FETCH_PRODUCTS_REJECTED:
        
            return {
                ...state,
                fetching:false,
                error:action.payload
            }; 
        
        default :
        return state;
    }
}