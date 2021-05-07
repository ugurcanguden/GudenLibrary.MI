import React, { Component } from 'react'
import { Form } from 'semantic-ui-react';

export type TextBoxProps={
    id:string,
    label:string,
    placeholder:string,
    isRequired:boolean,
    type?:string, 
    onChange: (result:any,value:any) => void
};
 
type TextBoxState={
    labelValue:string
};

export class TextBox extends Component<TextBoxProps,TextBoxState> 
{
    constructor(props:any)
    {
        super(props)
        this.state={
            labelValue:""
        }
    }
  
    handleChange = (e:any) => 
    {     
         const {onChange}=this.props;         
         onChange(e.target.id,e.target.value);
         this.setState({
            labelValue:e.target.value
         })       
    }
    render() 
    {
       
       const {label,placeholder,id,isRequired,type}= this.props;
       const {labelValue} =this.state;
        return (
            <div style={{width:"95%" , margin:"auto"}}>
               <Form.Input 
                fluid 
                label={label}
                placeholder= {placeholder==""?label:placeholder}
                id={id}
                type={type}
                onChange= {this.handleChange}
                error={ 
                        (!!!isRequired||(!!isRequired&&labelValue!="")) 
                        ? 
                        false 
                        :
                        { content:'Lütfen '+label+'  giriniz.' }
                    }
              />  
            </div>
  
        )
    } 
}


 
 