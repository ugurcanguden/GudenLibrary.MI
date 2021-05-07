import React, { Component } from 'react'  
import { RouteComponentProps } from 'react-router-dom'
import { fetchProduct } from '../actions/productsAction';
import GridView, { GVProps } from '../components/BaseComponents/GridView';

  type HomeProps ={
    dispatch:any;  
    product:any ;
  }  
  &RouteComponentProps<any>
 ;
  

 class Home extends Component <HomeProps>
{
    constructor(props:HomeProps)
    {
        super(props)
    }



    render() 
    {
       
         

        const gridViewProps:GVProps={
            storeName:"product",
            dispatchMethod:fetchProduct,
            noDataFoundMessage:"",
            headers:[ 
                {
                    key:"productName", //entity Name
                    headerName:"Ürün Adı"//Kolon adı..
                },
                {
                    key:"quantityPerUnit",
                    headerName:"Açıklama"
                },
                {
                    key:"unitPrice",
                    headerName:"Fiyat"
                },
                {
                    key:"unitsInStock",
                    headerName:"Stok Adeti"
                }   ], 
                reduxStoreValues:null,
                queryParams:{ 
                },
                sortColumb:"ProductName",
                dispatch:this.props.dispatch
             
        }  
    
        return (
                   <GridView {...gridViewProps}></GridView>
               
       
            )
    }
}
export default (Home as any)

 