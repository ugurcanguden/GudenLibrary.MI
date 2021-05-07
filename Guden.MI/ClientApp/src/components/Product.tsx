import React from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {itemProduct} from '../actions/productsAction';

type productType={
    productName:String
}



const Product = (product:itemProduct) => 
(
    <Grid.Column>
        <Card>
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{product.productName }</Card.Header>
                    <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>
                    Matthew is a musician living in Nashville.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                    <Icon name='user' />
                    22 Friends
                    </a>
                </Card.Content>
            </Card>     
    </Card>       
    </Grid.Column>

  )
  
  export default Product

 