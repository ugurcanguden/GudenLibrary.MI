import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
//Sayfalar
import ProductList from '../components/ProductList';
///fetch
import {fetchProduct,itemProduct,productActionResult} from '../actions/products';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';

type IProducts =
  {
    dispatch:any
    product:productActionResult
  };
  type ProductsProps =
  IProducts
  &RouteComponentProps<any>
 ;
  
class Products extends Component<ProductsProps>
   {
    
    constructor(props: Readonly<ProductsProps>) 
    {
        super(props);
    }; 

 
    componentDidMount()
    {
        this.props.dispatch(fetchProduct());
    }       

    render() {
        
       const {product}= this.props;
      
        return (<div>
                  {
                    product.products.length>0&&<ProductList { ...product} />
                  }
                 
                 </div>
               );
    }
}

export default connect(
    (state:{product:productActionResult}) => 
    {
        var product=state.product;
        return {
          product
        }
    }, function (dispatch, props) {
      return {
        dispatch,
        ...bindActionCreators({
        ...fetchProduct
      }, dispatch)
      }
    }
    )(Products as any)

