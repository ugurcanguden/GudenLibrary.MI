import React, { useState, Component  } from 'react'
import { useHistory, withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ConfirmMessage } from '../../components/utilComponents/ConfirmMessage';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import {API_BASE,axiosConfig,axiosConfigWithToken} from '../../config/env';
import axios from 'axios';
import  *as FaIcons  from "react-icons/fa";
import  IconContext from "react-icons";

 
 
type NavbarProps =
  {   
   
  } & RouteComponentProps<any>;  
  
  type menuItems={
            title:string,
            path:string,
            icon:string,
            cName:string
  }
  type NavbarState={
    confirmShow:boolean,
    sidebar:boolean,
    SidebarData:menuItems[]
  };


   class Navbar extends Component <NavbarProps,NavbarState>
{
    constructor(props: Readonly<NavbarProps>) 
    {
        super(props);
        this.state={
            confirmShow:false,
            sidebar:false,
            SidebarData:[]
        }        
    }

    componentWillMount()
    {
        axios.get(`${API_BASE}/Auth/getMenulistbyUseId`, axiosConfigWithToken)
        .then((response)=>
        {           console.log(response.data);
            this.setState({
                SidebarData:response.data.data 
            })
        })
        .catch((err)=>{

        })
        
    }
    

    
    render() 
    {
     const {sidebar,confirmShow}=this.state;
 
     
     const showSideBar=()=>{
         this.setState({
            sidebar:!sidebar
         })
     };
    

     const onConfirm=(isConfirm:boolean) =>
     {
         this.setState({
            confirmShow:false
         });
         if(isConfirm) //çıkmak istediğine emin ise..
         {           
            localStorage.clear();
            this.props.history.push('/Home');
            window.location.reload();
         }
     }
    const {SidebarData}=this.state;

    
    
 
 
     return (        
                <React.Fragment>
                    <ConfirmMessage  isShow={confirmShow} onConfirm={onConfirm}/>
                  
                    <div  className="navbar">
                    <div  className="navbar-left">
                            <Link to='#' className='menu-bars-left'>
                            <FaIcons.FaHome onClick={showSideBar} />
                               
                            </Link>           
                    </div>
                    <div  className="navbar-rigth">
                            <Button onClick={()=>this.setState({confirmShow:true})}  className='menu-bars-rigth'>
                            <FaIcons.FaPowerOff  />
                            </Button>                   
                    </div>    
                    </div>
                    <nav className={sidebar?'nav-menu active':'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSideBar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars-left'>
                                    <FaIcons.FaAlignLeft></FaIcons.FaAlignLeft>
                                </Link>
                            </li>
                            {
                                SidebarData.map((item,index)=>{
                                    return (
                                        <li key={index} className={item.cName} >
                                            <Link to={item.path} onClick={()=> this.props.history.push(item.path)}>
                                        
                                           <FaIcons.FaCubes  />
                                                <span>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                    </nav>
                
                </React.Fragment>
            )
    
    }
}
export default withRouter(Navbar)
 