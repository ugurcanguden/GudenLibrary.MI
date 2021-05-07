
import React, { Component } from 'react';  
import { Button,  Modal } from 'semantic-ui-react' 
import 'semantic-ui-css/semantic.min.css'
import '../../App.css'; 
  
export type MessageBoxProps=
{  
    isOpen:boolean,
    isSuccess:boolean, 
    messageText:string,
    initialSize:string,
    header:string,
    redirectUrl:string ,
    history:any
} ;  

type MessageBoxState=
{  
    isOpen:boolean 
};
    

export class MessageBox extends Component<MessageBoxProps,MessageBoxState>
{
   constructor(props: any)
   {
       super(props)
       this.state={
           isOpen:false
       }
   }

   componentDidMount(){
    const { isOpen } = this.props;
    if(isOpen)
    this.setState({
        isOpen
    });
   }
    componentDidUpdate(prevProps: MessageBoxProps) {
        const { isOpen } = this.props;

        if (prevProps.isOpen != isOpen && (isOpen != undefined || isOpen != null))
            this.setState({
                isOpen
            });
    }
  
    UpdateMessageBoxVisible=()=>{
        const { isSuccess,redirectUrl,history } = this.props;
        this.setState({isOpen:false});
        if(redirectUrl!=""&&isSuccess)
        {
            history.push(redirectUrl);            
            window.location.reload(true);
        }
        
        
    }

    
    render() 
    {
       
        const {initialSize,isSuccess,header,messageText}=this.props;
        const {isOpen}=this.state;

        return (          
           
                    <Modal
                    className='centerContainerChild' 
                    style={{height:'auto'}}    
                    size={initialSize as any}
                    open={isOpen}
                    centered={false}
                    onClose={this.UpdateMessageBoxVisible}
                    >
                    <Modal.Header>{header}</Modal.Header>
                        <Modal.Content>  
                            <Modal.Description>
                            <p>{messageText}</p>
                            </Modal.Description>
                        </Modal.Content>
                    <Modal.Actions>
                    {!!!isSuccess&&<Button negative onClick={this.UpdateMessageBoxVisible}>
                    Ok
                    </Button>}
                    {!!isSuccess&&<Button positive   onClick={this.UpdateMessageBoxVisible}>
                    Ok
                    </Button>}
                    </Modal.Actions>
                </Modal>  
            )
    }
}

  

 
 