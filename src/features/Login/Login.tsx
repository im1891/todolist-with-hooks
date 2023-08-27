import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormikConfig, useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { loginTC } from './auth-reducer'
import { Navigate } from 'react-router-dom'
import { clearTodolistDataAC } from '../TodolistsList/todolists-reducer'

type FormValuesType = {
	email: string
	password: string
	rememberMe: boolean
}

function validate(values: FormValuesType) {
	if (!values.email) {
		return { email: 'Email is required' }
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		return { email: 'Invalid email address' }
	}
	if (!values.password) {
		return { password: 'Password is required' }
	} else if (values.password.length < 5) {
		return { password: 'Password must be more than 4 characters ' }
	}
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	const formikConfig: FormikConfig<FormValuesType> = {
		validate,
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: (values) => {
			dispatch(loginTC(values))
			dispatch(clearTodolistDataAC())
			isLoggedIn && formik.resetForm()
		}
	}
	const formik = useFormik<FormValuesType>(formikConfig)

	if (isLoggedIn) return <Navigate replace to={'/'} />
	return <Grid container justifyContent={'center'}>
		<Grid item justifyContent={'center'}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>To log in get registered
							<a href={'https://social-network.samuraijs.com/'}
								 target={'_blank'}> here
							</a>
						</p>
						<p>or use common test account credentials:</p>
						<p>Email: free@samuraijs.com</p>
						<p>Password: free</p>
					</FormLabel>
					<FormGroup>
						<TextField label='Email' margin='normal'
											 {...formik.getFieldProps('email')} />
						<div style={{ color: 'red' }}>
							{formik.touched.email && formik.errors.email && formik.errors.email}
						</div>
						<TextField type='password' label='Password' margin='normal'
											 {...formik.getFieldProps('password')} />
						<div style={{ color: 'red' }}>
							{formik.touched.password && formik.errors.password && formik.errors.password}
						</div>
						<FormControlLabel label={'Remember me'} control={<Checkbox checked={formik.values.rememberMe}
																																			 {...formik.getFieldProps('rememberMe')} />} />
						<Button
							type={'submit'}
							variant={'contained'}
							color={'primary'}
							disabled={!formik.isValid}

						>
							Login
						</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}