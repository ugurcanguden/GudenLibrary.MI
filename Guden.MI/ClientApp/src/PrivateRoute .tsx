
import React, { Component, ReactNode } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
 
interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (
            <Route { ...rest } render={ props => (
            localStorage.getItem("accessToken") ? 
            <Component {...props} /> : 
            <Redirect to={{ pathname: '/LoginPage', state: { from: props.location } }} />
        ) }
        />
    );
}

export default PrivateRoute;

// import React, { Component } from 'react'
// import { Route, Redirect } from 'react-router-dom';
// export default class PrivateRoute  extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }
