import { AppReducersThunkType } from '../../App/store'
import { RequestStatusType, setAppStatusAC } from '../../App/app-reducer'
import { authApi, AxiosErrorType, LoginParams, ResultCodes } from '../../todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
	isLoggedIn: false
}
export const authReducer = (state: LoginReducerStateType = initialState, action: LoginReducerActionsType): LoginReducerStateType => {
	switch (action.type) {
		case 'AUTH/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}

// types

type LoginReducerStateType = typeof initialState
export type LoginReducerActionsType = ReturnType<typeof setIsLoggedIn>

// actions
export const setIsLoggedIn = (value: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', value } as const)
// thunks

export const loginTC = (logData: LoginParams): AppReducersThunkType =>
	async (dispatch) => {
		dispatch(setAppStatusAC(RequestStatusType.LOADING))
		try {
			const data = await authApi.login(logData)

			if (data.resultCode === ResultCodes.OK) {
				dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
				dispatch(setIsLoggedIn(true))
				return true
			} else {
				handleServerAppError(data, dispatch)
				return false
			}
		} catch (e) {
			const error = e as AxiosErrorType
			handleServerNetworkError(error, dispatch)
			return false
		}
	}

export const logoutTC = (): AppReducersThunkType => (dispatch) => {
	dispatch(setAppStatusAC(RequestStatusType.LOADING))
	authApi.logout()
		.then(data => {
			if (data.resultCode === ResultCodes.OK) {
				dispatch(setIsLoggedIn(false))
				dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
			} else handleServerAppError(data, dispatch)
		})
		.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
}
