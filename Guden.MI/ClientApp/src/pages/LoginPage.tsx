import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { login } from '../actions/auth';
import { HashLoader } from 'react-spinners';
import MessageBox from '../components/utilComponents/MessageBox';
import { RouteComponentProps } from 'react-router-dom';



interface ILoginPageProps {
    auth: {
        isLoggedIn:boolean
        user:any
        fetching:boolean
    },
    dispatch:any 
  };  
  interface LoginPageState {
            email: string,
            password: string,
            submitted: boolean,
            processCount:number,
            mbItem:{
                isOpen:boolean,
                isSuccess:boolean, 
                messageText:string,
                initialSize:string,
                header:string,
                redirectUrl:string
            }  
  };
  
  type LoginPageProps =
  ILoginPageProps
  & RouteComponentProps<any>



class LoginPage extends React.Component<LoginPageProps,LoginPageState>
{
    constructor(props: Readonly<LoginPageProps>) 
    {
        super(props);
      
        this.state = { 
            email: '',
            password: '',
            submitted: false,
            processCount:0,
            mbItem:{
                isOpen:false,
                isSuccess:true, 
                messageText:"",
                initialSize:"mini",
                header:"",
                redirectUrl:""
            }
        }; 
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

     handleChange=(e: any)=> {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                this.setState({ email: value });
                break;
            case "password":
                this.setState({ password: value });
                break;
            default:
                break;
        }
        
    };

     handleSubmit=(e: any)=> 
     {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) 
        {
            dispatch(login(email, password));
        }
    };    

    componentDidUpdate(_prevState: { auth: any; })
    {
        const {
            mbItem,
            processCount
        } = this.state;
        
        const {
            auth
        }=this.props; 

        if(_prevState.auth&&_prevState.auth!=auth
            &&
            auth.user
            &&
            auth.user.success!=undefined)
        {
            var url=""
            if(auth.user.success)
            {
                url="/Home";
            }
            this.setState({ 
                mbItem: { ...mbItem, isOpen: true,isSuccess:auth.user.success,messageText:auth.user.message,redirectUrl:url} ,
                processCount:processCount+1
            });
        }
    };

    render() {
       
        const { 
            email, 
            password, 
            submitted,
            mbItem,
            processCount
        } = this.state;

        const {
            auth
        }=this.props;      

        return (
            <React.Fragment>
                 
    {                   
                  
                  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    {
                      auth&&auth.fetching===true
                                ?
                     <HashLoader loading={true} />
                                :
                     <div>
                      <MessageBox mbItems={mbItem} pprocessCount={processCount} {...this.props} />    
                                
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image size={'large'} src={require('../image/login.jpg')} /> Giriş Yap
                    </Header>
                       
                    <Form size='large'>
                        <Segment stacked>
                
                    
                   
                    <div className="col-md-6 col-md-offset-3">    
                                    
                       
                            <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Login</button>
                            
                            </div>
                        </form> 
                    </div>   
                  </Segment> 
                </Form>
               
                <Message>
                   Üye ol <a href='#'>Sign Up</a>
                </Message>
                </div>}
              </Grid.Column>
            </Grid> 
            }
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = (state:ILoginPageProps) => 
{    
    return {auth:state.auth}
};

 export default connect(mapStateToProps,null) (LoginPage as any);

