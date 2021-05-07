import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import { login } from '../../actions/user/authAction';
import { HashLoader } from 'react-spinners';
import { RouteComponentProps, Router } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form';
import {  TextBox, TextBoxProps } from '../../components/BaseComponents/AllComponents';
import { MessageBox, MessageBoxProps } from '../../components/utilComponents/MessageBox';
 




type LoginPageProps=
{
    formValues:{
        values:{
        Email:string,
        Password:string
    }},
    auth:{
        fetching:boolean,
        isShowMessage:boolean,
        message:string,
        success:boolean
    },    
    dispatch:any
} 
&InjectedFormProps
&RouteComponentProps<any>;


class LoginPage extends React.Component<LoginPageProps>
{
     constructor(props:LoginPageProps){
         super(props)
     }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

 
    onChange = (item:string,value:any) => 
    {
        
        this.props.change(item,value)
    }
    
    handleSubmit=(e: any)=> 
    {
     if(this.handleValidation())
     {  
        const {Email,Password}=this.props.formValues.values;       
        const {dispatch} =  this.props     
        dispatch(login(Email,Password));
      
     }
     else{
        alert("Formu kontrol ediniz.")
     }
        
         
    }
    handleValidation(){
        let formIsValid = true;
        if(this.props&&this.props.formValues)
        {
            let {values} = this.props.formValues;
            
    
            //Email
            if(!values.Email){
            formIsValid = false; 
            } 

        if(!values.Password)
            {
                formIsValid = false; 
            }
    
        
        }
        else
            formIsValid = false; 
        
        return formIsValid;
   }

    render() {
       
        const txtEmail:TextBoxProps=
        {
            id:"Email",
            label:"Email",
            placeholder:"...@....com" ,
            isRequired:true,
            onChange:this.onChange
        }
        const txtPassword:TextBoxProps=
        {
            id:"Password",
            label:"Şifre",
            placeholder:"Şifre" ,
            isRequired:true,
            onChange:this.onChange,
            type:"password"
        }
        const {fetching}=this.props.auth;
        
        const mbProps:MessageBoxProps=
        {
            isOpen:this.props.auth.isShowMessage,
            isSuccess:this.props.auth.success, 
            messageText:this.props.auth.message,
            initialSize:"mini",
            header:"Giriş işlemi",
            redirectUrl:"/Home",
            history:this.props.history
        }
        return (
            
            <React.Fragment>           
            {!fetching&& 
            <Form className={"form"}  onSubmit={this.handleSubmit as any} > 
           
                <TextBox  {...txtEmail as any}/>
                <TextBox  {...txtPassword as any}/> 
                <div  className={"formSubmitButtonDivLeft"}>
                    <Button 
                            className={"formSubmitButtonLeft"} 
                            color={'blue'}
                            onClick={()=>{this.props.history.push("/Register")}}
                            >Hesap oluştur</Button>  
                 </div>
                 <div  className={"formSubmitButtonDivRight"}>
                    <Button 
                        className={"formSubmitButton"}   
                        type='submit' 
                        color={'green'}
                        >Giriş
                    </Button>  

                </div> 
                            
            </Form>  
            }
            { !!fetching&&  
            <div className={"form"}>
                <HashLoader loading={true}/>  
            </div>
            
            }   
            <MessageBox {...mbProps as any} />
           
           
          </React.Fragment>  
        );
    }
}


//#region Connect

 
 
function mapStateToProps(state: any) 
{  

    
     
    return {    formValues:state.forms.login&&state.forms.login?
                state.forms.login:null
                ,
                auth:state.auth

           };
 }
var form = reduxForm({
  form: "login" 
})(LoginPage as any);
export default connect(mapStateToProps)(form as any);

 
//#endregion







