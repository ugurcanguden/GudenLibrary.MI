import React, { Component } from 'react'
import { connect, useDispatch} from 'react-redux'
import { Button, Form} from 'semantic-ui-react'
import { reduxForm,InjectedFormProps } from 'redux-form'
import {TextBox,DatePicker,DropdownList,dataOptions, MessageBox, MessageBoxProps} from '../../components/BaseComponents/AllComponents';
import {TextBoxProps,DropdownListProps} from '../../components/BaseComponents/AllComponents';
import { RouteComponentProps } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { Register as actionRegister } from '../../actions/user/registerAction';
 


 type RegisterProps=
 {
    formValues:{
        values:
            { 
                FirstName:string
                LastName:string
                Email:string
                BirthDate:Date
                Password:string
                PhoneNumber:string
                Gender:string
                OperationClaimIds:string
            }
        },
    register:{
        fetching:boolean,
        isShowMessage:boolean,
        message:string,
        success:boolean
    },
    dispatch:any
 } 
 &InjectedFormProps
&RouteComponentProps<any>;

 type RegisterState=
 {
    isValidForm:boolean
 }  ;

 class Register extends Component<RegisterProps,RegisterState> 
 {
    constructor(props:any)
    {
        super(props)
        this.state={
            isValidForm:false
        }
         
    }
    


    onChange = (item:string,value:any) => 
    {
        
        this.props.change(item,value)
    }

    handleSubmit=(e: any)=> 
    {
        if(this.handleValidation())
        {
            const {dispatch,formValues} =this.props;
            dispatch(actionRegister(formValues.values))
         }else{
         
         }
         
    }
    handleValidation(){
        let {values} = this.props.formValues;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!values.FirstName){
           formIsValid = false; 
        }
  
        if(!values.LastName){
            formIsValid = false; 
         }
   
        //Email
        if(!values.Email){
           formIsValid = false; 
        }
  
        if(!values.OperationClaimIds){
            formIsValid = false; 
         }
    //     if(typeof values.Email !== "undefined"){
    //        let lastAtPos = values.Email.lastIndexOf('@');
    //        let lastDotPos = values.Email.lastIndexOf('.');

    //        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && values.Email.indexOf('@@') == -1 && lastDotPos > 2 && (values.Email.length - lastDotPos) > 2)) {
    //           formIsValid = false; 
    //         }
    //    }  

       if(!values.Password)
         {
            formIsValid = false; 
         }
 
       return formIsValid;
   }



    render() 
    { 
      
   
        const genderOptions = [
            { key: 'k', text: 'Erkek', value: 'Erkek' },
            { key: 'e', text: 'Kadın', value: 'Kadın' } 
        ];
         

        const txtName:TextBoxProps=
        {
            id:"FirstName",
            label:"İsim",
            placeholder:"İsim" ,
            isRequired:true,
            onChange:this.onChange
        }
        const txtLastName:TextBoxProps=
        {
            id:"LastName",
            label:"Soyisim",
            placeholder:"Soyisim" ,
            isRequired:true,
            onChange:this.onChange
        }
        const dtpBirthDate:TextBoxProps=
        {
            id:"BirthDate",
            label:"Doğum Tarihi",
            placeholder:"Doğum Tarihi" ,
            isRequired:false,
            onChange:this.onChange
        }
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
        const ddlGender:DropdownListProps=
        {
            id:"Gender",
            label:"Cinsiyet",
            placeholder:"Cinsiyet" ,
            isRequired:false,
            onChange:this.onChange,
            data:genderOptions as any,
            apiMethod:""
        };
        const ddlOperaionClaim:DropdownListProps=
        {
            id:"OperationClaimIds",
            label:"Rol",
            placeholder:"Rol" ,
            isRequired:true,
            onChange:this.onChange,
            data:[],
            apiMethod:"/Auth/getOperationClaimSelectList"
        };
        const txtPhoneNumber:TextBoxProps=
        {
            id:"PhoneNumber",
            label:"GSM",
            placeholder:"GSM" ,
            isRequired:false,
            onChange:this.onChange,
            type:"number"
        }
       
       
        
        const mbProps:MessageBoxProps=
        {
            isOpen:this.props.register.isShowMessage,
            isSuccess:this.props.register.success, 
            messageText:this.props.register.message,
            initialSize:"mini",
            header:"Kayıt işlemi",
            redirectUrl:"/LoginPage",
            history:this.props.history
        } 
       
        const {fetching}=this.props.register;
        return (     
            <React.Fragment>
                    {!fetching&&
                        <Form className={"form"}  onSubmit={this.handleSubmit as any} >
                        <TextBox  {...txtName as any}/>
                        <TextBox  {...txtLastName as any}/>
                        <DatePicker {...dtpBirthDate as any}/>
                        <TextBox  {...txtEmail as any}/>
                        <TextBox  {...txtPassword as any}/>
                        <DropdownList {...ddlGender}/>
                        <DropdownList {...ddlOperaionClaim}/>
                        <TextBox  {...txtPhoneNumber as any}/> 
                        <div>
                        <div  className={"formSubmitButtonDivLeft"}>
                            <Button 
                                    className={"formSubmitButtonLeft"}   
                                    onClick={()=>{this.props.history.push("/")}} 
                                    color={'blue'}
                                    >Geri Dön</Button>  
                        </div>  
                        <div  className={"formSubmitButtonDivRight"}>
                            <Button 
                                    className={"formSubmitButtonRight"}   
                                    type='submit' 
                                    color={'green'}
                                    >Kaydet</Button>  
                        </div>       
                        </div>
                        </Form>
                    }

                    { !!this.props.register.fetching&&  
                     <div className={"form"}>
                         <HashLoader loading={true}/>  
                     </div>
                    
                     }
                     <MessageBox {...mbProps as any} />
                </React.Fragment>
               )

    }
}




//#region Connect

 
 
  function mapStateToProps(state: any) 
  {  
       
      return {      formValues:state.forms.register&&state.forms.register
                    ?
                    state.forms.register
                    :
                    null,
                    register:state.register
                };
   }
var form = reduxForm({
    form: "register",
    initialValues:{        
             Gender:"Erkek"
    }
  })(Register as any);
  export default connect(mapStateToProps)(form as any);
  //#endregion



