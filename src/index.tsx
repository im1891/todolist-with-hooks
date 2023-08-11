import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { store } from './App/store'
import { Provider } from 'react-redux'
import AppWithReducers from './trash/AppWithReducers'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
	<Provider store={store}>
		<AppWithReducers />
	</Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
