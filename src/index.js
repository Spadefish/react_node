import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'

import AuthRoute from './component/authroute/authroute'
import Register from './container/register/register'
import Login from './container/login/login'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute/>
				<Route path='/login' component={Login}/>
				<Route path='/register' component={Register}/>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
