
import PropTypes from 'prop-types';
import Product from './Product'; 
import {itemProduct,productActionResult} from '../actions/productsAction';
import { Grid } from 'semantic-ui-react'
import { HashLoader } from 'react-spinners';
import { RouteComponentProps } from 'react-router-dom';

import React, { Component } from 'react'





export default class ProductList extends Component <productActionResult>
{
    constructor(props: Readonly<productActionResult>) 
    {
        super(props);
    }; 
    
    render() 
    {
       const {products}=this.props;
        return (
                <div>
                    <Grid stackable columns={3}>
                        {
                        products.map
                                (
                                    product => 
                                    <Product {...product} ></Product>
                                    
                                    
                                )
                        }
                    </Grid> 
                </div>
        )
    }
 
}
