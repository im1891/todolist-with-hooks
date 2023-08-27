import { appReducer, AppReducerStateType, RequestStatusType, setAppErrorAC, setAppStatusAC } from './app-reducer'

let startState: AppReducerStateType

beforeEach(() => {
	startState = {
		status: RequestStatusType.IDLE,
		error: null,
		isInitialized: false
	}
})

test('Error message should be set', () => {
	const endState = appReducer(startState, setAppErrorAC('Error message'))

	expect(endState.error).toBe('Error message')
})

test('Correct status should be set', () => {
	const endState = appReducer(startState, setAppStatusAC(RequestStatusType.LOADING))

	expect(endState.error).toBe(null)
	expect(endState.status).toBe('loading')
})