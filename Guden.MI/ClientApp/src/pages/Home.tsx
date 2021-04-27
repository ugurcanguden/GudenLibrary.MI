import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { Grid } from 'semantic-ui-react'
import { fetchProduct, productActionResult } from '../actions/products'
import GridView,{GridViewProps} from '../components/BaseComponents/GridView'
 
  type HomeProps ={
    dispatch:any
    product:productActionResult 
  }  
  &RouteComponentProps<any>
 ;
  

 class Home extends Component <HomeProps>
{
    constructor(props:HomeProps)
    {
        super(props)
    }

     gvProps:GridViewProps={
        noDataFoundMessage:"ürün bulunmadı",
        headers:
        [
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
            }
        ],
        activePageIndex:0,
        selectMethod:"",
        data:[ this.props.product.products              
            ]
    }
    componentDidMount()
    {
        this.props.dispatch(fetchProduct());
    }  
    render() 
    {
       
        return (
            
               
                     <GridView {...this.gvProps} data={this.props.product.products}></GridView>
               
              
        )
    }
}
export default connect(
    (state:{product:productActionResult}) => 
    {
        var product=state.product;
        return {
          product
        }
    }, function (dispatch: Dispatch<AnyAction>, props: any) {
      return {
        dispatch,
        ...bindActionCreators({
        ...fetchProduct
      }, dispatch)
      }
    }
    )(Home as any)

 