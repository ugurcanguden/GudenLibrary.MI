import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import logger from 'redux-logger'; //dispath işlemlemlerinde consola log basar..
import reduxPromise from 'redux-promise-middleware' // bir distpah işlemi başlamadan önce ve sonra loading ifadelerini yönetir...

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromise,thunk,logger))
);



// Get the application-wide store instance, prepopulating with state from the server where available.


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>

   , document.getElementById('root'));

registerServiceWorker();
