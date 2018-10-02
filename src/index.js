import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'

import Dashboard from './state/reducers/dashboard';
import Auth from './state/reducers/auth';

const rootReducer = combineReducers({
	dashboard: Dashboard,
	auth: Auth
});

const composeEnhancers = process.env.NODE_ENV === "development" ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose


const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>


	, document.getElementById('root'));
registerServiceWorker();
