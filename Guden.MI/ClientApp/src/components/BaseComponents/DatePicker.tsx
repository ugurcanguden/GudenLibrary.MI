import React, { Component } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import 'semantic-ui-css/semantic.min.css';
export type DatePickerProps={
    id:string,
    label:string,
    placeholder:string,
    isRequired:boolean,
    onChange: (result:any,value:any) => void
};
 
type DatePickerState={
    selectedDate:any
};

export  class DatePicker extends Component <DatePickerProps,DatePickerState>
{
    constructor(props:any)
    {
        super(props)
        this.state={
            selectedDate:null
        }

    }
   
   
    handleChange = (e:any,data:any) => 
    {     
         const {onChange}=this.props;       
         onChange(data.id,data.value);
         this.setState({
            selectedDate:data.value
         })       
    }
    render() {
        const {id,isRequired,label,placeholder}=this.props; 
        const {selectedDate}=this.state; 
        const dateFormat='DD/MM/YYYY'
        return (
            <div style={{width:"95%" , margin:"auto"}}>
                <SemanticDatepicker 
                    id={id}
                    label={label}
                    format={dateFormat}
                    datePickerOnly={true}
                    placeholder= {placeholder==""?label:placeholder}
                    error={ 
                            (!!!isRequired||(!!isRequired&&selectedDate!=null))
                            ? 
                            false 
                            :
                            { content:'Lütfen '+label+'  giriniz.' }
                        }
                    onChange={this.handleChange}
                    
                />
                { 
                   (!!!isRequired||(!!isRequired&&selectedDate!=null))
                    ? 
                    false 
                    :
                    <div className="ui pointing above prompt label" id="LastName-error-message" role="alert" aria-atomic="true">{'Lütfen '+label+'  giriniz.'}</div> 
              
                }
                
            
            </div>
        )
    }
}
