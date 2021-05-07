
import React, { Component, ReactNode } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const dispatch = useDispatch();
    return (
            <Route { ...rest } render={ props => (
            localStorage.getItem("accessToken") ? 
            <Component {...props} dispatch={dispatch} /> : 
            <Redirect to={{ pathname: '/LoginPage', state: { from: props.location } }} />
        ) }
        />
    );
}

export default PrivateRoute;
 