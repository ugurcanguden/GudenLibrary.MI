
import PropTypes from 'prop-types';
import '../../App.css';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react' 
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';


interface IMessageBoxProps {
pprocessCount:number,
mbItems:{
    isOpen:boolean,
    isSuccess:boolean, 
    messageText:string,
    initialSize:string,
    header:string,
    redirectUrl:string
} 
} ;  
interface IMessageBoxState {
processCount:number,
messageBoxItems:{
    isOpen:boolean,
    isSuccess:boolean, 
    messageText:string,
    initialSize:string,
    header:string,
    redirectUrl:string
}
};
type MessageBoxProps =
IMessageBoxProps
& RouteComponentProps<any>


export class MessageBox extends Component<MessageBoxProps,IMessageBoxState> 
{
    constructor(props: Readonly<MessageBoxProps>) 
    {
        super(props);
        // reset login status
        this.state = {  
            processCount:props.pprocessCount,         
            messageBoxItems:{
                isOpen:props.mbItems.isOpen,
                isSuccess:props.mbItems.isSuccess, 
                messageText:props.mbItems.messageText,
                initialSize:props.mbItems.initialSize,
                header:"",
                redirectUrl:""
            }
        }; 
    };

    static propTypes = {
        mbItems: PropTypes.object.isRequired
    };

    componentDidUpdate(_prevprops: any,_prevState: any)
    {
        const {messageBoxItems,processCount}=this.state;
        const {mbItems,pprocessCount}=this.props;
        if(processCount!=pprocessCount)
        {       
            this.setState({ 
                messageBoxItems: { ...messageBoxItems, isOpen: true,isSuccess:mbItems.isSuccess,messageText:mbItems.messageText,redirectUrl:mbItems.redirectUrl} ,
                processCount:pprocessCount
            })                
        }
    };

        updateMessageBoxVisible=()=>
        {
            const {messageBoxItems}=this.state;    
            const {mbItems,history}=this.props;    
            this.setState({
                messageBoxItems:{
                    ...messageBoxItems, 
                    isOpen: !messageBoxItems.isOpen               
                }
            });
            if(messageBoxItems.redirectUrl!=""&&messageBoxItems.isSuccess)//eğer bir link verildiyse yönlendirme yaoar...
            {
                history.push(messageBoxItems.redirectUrl);
                window.location.reload();
            }
                
        };
    
    render() 
    {
        const {messageBoxItems}=this.state;


        return ( 
        
                     
                                    <Modal
                                        className='centerContainerChild' 
                                        style={{height:'auto'}}    
                                        size={messageBoxItems.initialSize as any}
                                        open={messageBoxItems.isOpen}
                                        centered={false}
                                        onClose={this.updateMessageBoxVisible}
                                        >
                                        <Modal.Header>{messageBoxItems.header}</Modal.Header>
                                            <Modal.Content>  
                                                <Modal.Description>
                                                <p>{messageBoxItems.messageText}</p>
                                                </Modal.Description>
                                            </Modal.Content>
                                        <Modal.Actions>
                                        {!!!messageBoxItems.isSuccess&&<Button negative  onClick={this.updateMessageBoxVisible}>
                                        Ok
                                        </Button>}
                                        {!!messageBoxItems.isSuccess&&<Button positive  onClick={this.updateMessageBoxVisible} >
                                        Ok
                                        </Button>}
                                        </Modal.Actions>
                                    </Modal>    
                      
            )
    }
}

export default MessageBox
