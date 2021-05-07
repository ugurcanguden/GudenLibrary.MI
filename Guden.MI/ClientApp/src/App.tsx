
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Users/LoginPage';
import Products from './pages/Products';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute ';
import  Navbar  from './components/navigationComponents/Navbar';
import './App.css';
import Register from './pages/Users/Register';
import { useDispatch } from 'react-redux';
 
function App()
{ 
     const dispatch = useDispatch()
  return (
   <div>
 
    
      <Router> 
             {localStorage.getItem("accessToken")&&<Navbar/>}
            <Switch>
            
                  <Route dispatch={dispatch} path="/LoginPage" component={ localStorage.getItem("accessToken") ? Products:LoginPage} /> 
                  <Route dispatch={dispatch}  path="/Register" component={ localStorage.getItem("accessToken") ? Products:Register} /> 
                  <PrivateRoute    path="/Products" component={Products} />
                  <PrivateRoute    path="/" component={Home} />
                  <PrivateRoute    path="/Home" component={Home} />
                

              
              </Switch>          
        </Router>     
   </div>

  );
}

export default App;

