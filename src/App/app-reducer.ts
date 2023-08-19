const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as null | string
}
export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsType): AppReducerStateType => {
	switch (action.type) {
		case 'APP/SET-ERROR':
			return { ...state, error: action.errorMessage }
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
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