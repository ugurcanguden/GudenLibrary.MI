import { Form, Select } from 'semantic-ui-react';
import React, { Component } from 'react';
import {API_BASE,axiosConfig,axiosConfigWithToken} from '../../config/env';

export type dataOptions={
    dataOptions:{
        key: string, 
        text: string, 
        value: any 
    }
}

export type DropdownListProps={
    id:string,
    label:string,
    placeholder:string,
    isRequired:boolean,
    onChange: (result:any,value:any) => void,
    data:dataOptions[],
    apiMethod:string
};

type DropdownListState={
    selectedValue:""
    dataOptions:dataOptions[]
};



export  class DropdownList extends Component  <DropdownListProps,DropdownListState>
{    
    constructor(props:any)
    {
        super(props)
        this.state={
            selectedValue:"",
            dataOptions: []
        }
    }
  
    componentDidMount()
    {
        const {data,apiMethod}=this.props;
        if(data&&data.length>0)
        {
            this.setState({dataOptions:data})
        } 
        if(apiMethod&&apiMethod!="")
        {
            fetch(API_BASE+apiMethod)
            .then(response => response.json())
            .then(data => {
                this.setState({ dataOptions: data });
            });
        }
    }

    handleChange = (e:any,data:any) => 
    {     
        
         const {onChange}=this.props;         
         onChange(data.id,data.value);
         this.setState({
            selectedValue:data.value
         })       
    }
    render() {
        const {data,placeholder,id,isRequired,label}=this.props;
        const {selectedValue,dataOptions}=this.state;
        return (
            <div style={{width:"95%" , margin:"auto"}}>
                      <Form.Field
                        id={id}
                        required={isRequired}
                        error={ 
                            (!!!isRequired||(!!isRequired&&selectedValue!=""))
                            ? 
                            false 
                            :
                            { content:'Lütfen '+label+'  giriniz.' }
                          }
                        control={Select}
                        options={dataOptions}
                        label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                        placeholder={placeholder}
                        search
                        searchInput={{ id: 'form-select-control-gender' }}
                        onChange={this.handleChange}
                    />
            </div>
        )
    }
}
