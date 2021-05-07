

import {
    FETCH_PRODUCTS_FULFILLED,
    FETCH_PRODUCTS_REJECTED,
    FETCH_PRODUCTS_PENDING,
} from '../actions/productsAction'
import { AccessTokenValidations } from '../utils/AccessToken'

const initialState=
{
    fetching:false,
    PagerResult:
    {
            data:[],
            pageIndex:0,
            pageSize:0,
            sortColumb:"",
            totalPage:0,
            totalRowCount:0,
            createDate:null
            
    },
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
                PagerResult:action.payload.data
            };
        case FETCH_PRODUCTS_REJECTED:
            if(action.payload.response.status)
                AccessTokenValidations(action.payload.response.status)
            return {
                ...state,
                fetching:false,
                error:action.payload
            }; 
        
        default :
        return state;
    }
}