import React, { Component } from 'react'
import { Label, Confirm, TextArea } from 'semantic-ui-react'
import '../../App.css';

type ConfirmMessageProps =
  {   
    isShow:boolean,
    onConfirm:Function
  } ;  
  type ConfirmMessageState={
    open:boolean    
  };

  export default  class ConfirmMessageBase extends Component<ConfirmMessageProps,ConfirmMessageState> 
{
    constructor(props: Readonly<ConfirmMessageProps>) 
    {
        super(props);
        this.state = { open: false } 
    }


componentDidUpdate(_prevprops: any)
{
    const {isShow}=this.props;
    const {open}=this.state;
    if(
        (isShow&&!this.state.open)
        ||
        (!isShow&&this.state.open)
      )
    {
        this.setState({
            open:!open
        })
    }
}

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })


  render() {
    const { onConfirm } = this.props;
    
    return (
     
            <Confirm  
                className='centerContainerChild' 
                style={{height:'auto'}}         
                open={this.state.open}
                content={"Çıkmak istediğinize emin misiniz?"}
                onCancel={()=>{onConfirm(false)}}
                onConfirm={()=>{onConfirm(true)}}
            />
 

   

     
    )
  }
} 



