import { AppReducersThunkType } from './store'
import { authApi, AxiosErrorType, ResultCodes } from '../todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { setIsLoggedIn } from '../features/Login/auth-reducer'

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as null | string,
	isInitialized: false
}
export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsType): AppReducerStateType => {
	switch (action.type) {
		case 'APP/SET-ERROR':
			return { ...state, error: action.errorMessage }
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		case 'APP/SET-IS-INITIALIZE':
			return { ...state, isInitialized: action.value }
		default:
			return state
	}
}

// actions
export const setAppErrorAC = (errorMessage: string | null) => ({
	type: 'APP/SET-ERROR',
	errorMessage
} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({
	type: 'APP/SET-STATUS',
	status
} as const)

export const setAppInitializeAC = (value: boolean) =>
	({ type: 'APP/SET-IS-INITIALIZE', value } as const)

// thunks
export const initializeAppTC = (): AppReducersThunkType => (dispatch) => {
	authApi.me()
		.then(data => {
			if (data.resultCode === ResultCodes.OK) {
				dispatch(setIsLoggedIn(true))
			} else handleServerAppError(data, dispatch)
		})
		.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		.finally(() => dispatch(setAppInitializeAC(true)))
}

// types
export enum RequestStatusType {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCEEDED = 'succeeded',
	FAILED = 'failed'
}

export type AppReducerStateType = typeof initialState

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppReducerActionsType =
	| SetAppErrorActionType
	| SetAppStatusActionType
	| ReturnType<typeof setAppInitializeAC>