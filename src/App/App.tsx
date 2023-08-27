import React, { useCallback, useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './store'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider } from '@mui/material/'
import { initializeAppTC, RequestStatusType } from './app-reducer'
import { linearProgressTheme } from '../utils/colorThemeMUI'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import CircularProgress from '@mui/material/CircularProgress'
import { logoutTC } from '../features/Login/auth-reducer'


type AppPropsType = {
	demo?: boolean
}


const App: React.FC<AppPropsType> = ({ demo = false }) => {
	const dispatch = useAppDispatch()
	const status = useAppSelector(state => state.app.status)
	const isInitialized = useAppSelector(state => state.app.isInitialized)
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])


	const onLogout = useCallback(() => {
		dispatch(logoutTC())
	}, [])

	if (!isInitialized) return <div style={{
		display: 'grid',
		placeItems: 'center',
		height: '100vh'
	}}>
		<CircularProgress size={300} />
	</div>

	return (
		<div className='App'>
			<AppBar position='static'>

				<Toolbar>
					{/*<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>*/}
					<h3>Todolist APP</h3>
					{isLoggedIn && <Button color='inherit' onClick={onLogout}>Logout</Button>}
				</Toolbar>
			</AppBar>
			<div style={{ height: '5px' }}>
				{status === RequestStatusType.LOADING &&
					<ThemeProvider theme={linearProgressTheme}>
						<LinearProgress color='primary' />
					</ThemeProvider>
				}
			</div>
			<Container fixed>
				<Routes>
					<Route path={'/404'} element={isLoggedIn ? <h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1> :
						<Navigate replace to={'/login'} />} />
					<Route path={'*'} element={<Navigate to={'/404'} />} />
					<Route path={'/'} element={<TodolistsList demo={demo} />} />
					<Route path={'/login'} element={<Login />} />
				</Routes>

			</Container>
			<ErrorSnackbar />
		</div>
	)
}

export default App
