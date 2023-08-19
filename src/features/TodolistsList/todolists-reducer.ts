import { ResultCodes, todolistsAPI, TodolistType } from '../../todolists-api'
import { AppReducersThunkType } from '../../App/store'
import { RequestStatusType, setAppStatusAC, SetAppStatusActionType } from '../../App/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { AxiosErrorType } from './tasks-reducer'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: TodolistsReducerActionTypes
): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'ADD-TODOLIST':
			return [{ ...action.payload.todolist, filter: 'all', entityStatus: RequestStatusType.IDLE }, ...state]

		case 'REMOVE-TODOLIST':
			return state.filter((tl) => tl.id !== action.payload.id)

		case 'CHANGE-TODOLIST-TITLE':
			return state.map((td) =>
				td.id === action.payload.id
					? { ...td, title: action.payload.title }
					: td
			)

		case 'CHANGE-TODOLIST-FILTER':
			return state.map((td) =>
				td.id === action.payload.id
					? { ...td, filter: action.payload.filter }
					: td
			)

		case 'SET-TODOLISTS':
			return action.payload.todolists.map((td) => ({ ...td, filter: 'all', entityStatus: RequestStatusType.IDLE }))


		case 'SET-TODOLIST-ENTITY-STATUS':
			return state.map(td => td.id === action.payload.id ?
				{ ...td, entityStatus: action.payload.status } : td)
		default:
			return state
	}
}

// actions
export const addTodolistAC = (todolist: TodolistType) =>
	({ type: 'ADD-TODOLIST', payload: { todolist } } as const)

export const removeTodolistAC = (id: string) =>
	({ type: 'REMOVE-TODOLIST', payload: { id } } as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
	({ type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
	({ type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const)
export const setTodolistsAC =
	(todolists: TodolistType[]) => ({
		type: 'SET-TODOLISTS', payload: { todolists }
	} as const)

export const setTodolistEntityStatusAC = (status: RequestStatusType, id: string) =>
	({ type: 'SET-TODOLIST-ENTITY-STATUS', payload: { status, id } } as const)

// thunks
export const fetchTodolistsTC = (): AppReducersThunkType => (dispatch) => {
	dispatch(setAppStatusAC(RequestStatusType.LOADING))
	todolistsAPI
		.getTodolists()
		.then((todolists) => {
			dispatch(setTodolistsAC(todolists))
			dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
		})
		.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))

}

export const deleteTodolistTC =
	(id: string): AppReducersThunkType =>
		async (dispatch) => {
			try {
				dispatch(setAppStatusAC(RequestStatusType.LOADING))
				dispatch(setTodolistEntityStatusAC(RequestStatusType.LOADING, id))
				const data = await todolistsAPI.deleteTodolist(id)
				if (data.resultCode === ResultCodes.OK) {
					dispatch(removeTodolistAC(id))
					dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
				} else {
					handleServerAppError(data, dispatch)
				}
			} catch (e) {
				const axiosError = e as AxiosErrorType
				handleServerNetworkError(axiosError, dispatch)
				dispatch(setTodolistEntityStatusAC(RequestStatusType.FAILED, id))
			}
		}

export const addTodolistTC =
	(title: string): AppReducersThunkType =>
		(dispatch) => {
			dispatch(setAppStatusAC(RequestStatusType.LOADING))
			todolistsAPI
				.createTodolist(title)
				.then(
					(data) => {
						if (data.resultCode === ResultCodes.OK) {
							dispatch(addTodolistAC(data.data.item))
							dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
						} else {
							handleServerAppError(data, dispatch)
						}

					}
				)
				.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		}

export const changeTodolistTitleTC =
	(id: string, title: string): AppReducersThunkType =>
		(dispatch) => {
			dispatch(setAppStatusAC(RequestStatusType.LOADING))
			todolistsAPI
				.updateTodolist(id, title)
				.then(
					(data) => {
						if (data.resultCode === ResultCodes.OK) {
							dispatch(changeTodolistTitleAC(id, title))
							dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
						} else {
							handleServerAppError(data, dispatch)
						}
					}
				)
				.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		}

// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistsReducerActionTypes =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| SetAppStatusActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| ReturnType<typeof setTodolistEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType,
	entityStatus: RequestStatusType
}
