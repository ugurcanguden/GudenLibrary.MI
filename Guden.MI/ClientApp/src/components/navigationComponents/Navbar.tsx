import React, { useState, Component  } from 'react'
import { useHistory, withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcos from 'react-icons/io'
import {SidebarData} from './SidebarData';
import './Navbar.css';

import {IconContext} from 'react-icons'
import  {ConfirmMessage} from '../../utils/index';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
 
type NavbarProps =
  {   
   
  } & RouteComponentProps<any>;  
  type NavbarState={
    confirmShow:boolean,
    sidebar:boolean
  };


   class Navbar extends Component <NavbarProps,NavbarState>
{
    constructor(props: Readonly<NavbarProps>) 
    {
        super(props);
        this.state={
            confirmShow:false,
            sidebar:false
        }        
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
             console.log(this.props)
            localStorage.clear();
            this.props.history.push('/Home');
            window.location.reload();
         }
     }
     return (        
                <React.Fragment>
                    <ConfirmMessage  isShow={confirmShow} onConfirm={onConfirm}/>
                    <IconContext.Provider value={{color:'#fff'}}>
                    <div  className="navbar">
                    <div  className="navbar-left">
                            <Link to='#' className='menu-bars-left'>
                                <FaIcons.FaBars onClick={showSideBar}/> 
                            </Link>           
                    </div>
                    <div  className="navbar-rigth">
                            <Button onClick={()=>this.setState({confirmShow:true})}  className='menu-bars-rigth'>
                                <IoIcos.IoIosExit /> 
                            </Button>                   
                    </div>    
                    </div>
                    <nav className={sidebar?'nav-menu active':'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSideBar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars-left'>
                                    <AiIcons.AiOutlineArrowLeft/>
                                </Link>
                            </li>
                            {
                                SidebarData.map((item,index)=>{
                                    return (
                                        <li key={index} className={item.cName} >
                                            <Link to={item.path}>
                                                {item.icon}
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
                </IconContext.Provider>
                </React.Fragment>
            )
    
    }
}
export default withRouter(Navbar)



