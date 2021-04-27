
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute ';
import  Navbar  from './components/navigationComponents/Navbar';
import './App.css';
 
function App()
{
  return (
    <Router> 
        {localStorage.getItem("accessToken")&&<Navbar/>}
          <Switch>      
            
              <Route path="/LoginPage" component={ localStorage.getItem("accessToken") ? Products:LoginPage} /> 
              <PrivateRoute path="/Products" component={Products} />
              <PrivateRoute path="/" component={Home} />
              <PrivateRoute path="/Home" component={Home} />
            

          
          </Switch>
          
    </Router>
  );
}

export default App;

