import React from 'react'
import './App.css'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@mui/material/LinearProgress'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { useAppSelector } from './store'
import { RequestStatusType } from './app-reducer'
import { ThemeProvider } from '@mui/material/'
import { linearProgressTheme } from '../utils/colorThemeMUI'

type AppPropsType = {
	demo?: boolean
}


const App: React.FC<AppPropsType> = ({ demo = false }) => {
	const status = useAppSelector(state => state.app.status)

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
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
				<TodolistsList demo={demo} />
			</Container>
			<ErrorSnackbar />
		</div>
	)
}

export default App
