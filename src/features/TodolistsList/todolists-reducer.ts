import { AxiosErrorType, ResultCodes, todolistsAPI, TodolistType } from '../../todolists-api'
import { AppReducersThunkType } from '../../App/store'
import { RequestStatusType, setAppStatusAC, SetAppStatusActionType } from '../../App/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { fetchTasksTC } from './tasks-reducer'


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: TodolistsReducerActionTypes
): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'TODOLIST/ADD-TODOLIST':
			return [{ ...action.payload.todolist, filter: 'all', entityStatus: RequestStatusType.IDLE }, ...state]

		case 'TODOLIST/REMOVE-TODOLIST':
			return state.filter((tl) => tl.id !== action.payload.id)

		case 'TODOLIST/CHANGE-TODOLIST-TITLE':
			return state.map((td) =>
				td.id === action.payload.id
					? { ...td, title: action.payload.title }
					: td
			)

		case 'TODOLIST/CHANGE-TODOLIST-FILTER':
			return state.map((td) =>
				td.id === action.payload.id
					? { ...td, filter: action.payload.filter }
					: td
			)

		case 'TODOLIST/SET-TODOLISTS':
			return action.payload.todolists.map((td) => ({ ...td, filter: 'all', entityStatus: RequestStatusType.IDLE }))


		case 'TODOLIST/SET-TODOLIST-ENTITY-STATUS':
			return state.map(td => td.id === action.payload.id ?
				{ ...td, entityStatus: action.payload.status } : td)
		case 'TODOLIST/CLEAR-TODOLIST-DATA':
			return []
		default:
			return state
	}
}

// actions
export const addTodolistAC = (todolist: TodolistType) =>
	({ type: 'TODOLIST/ADD-TODOLIST', payload: { todolist } } as const)

export const removeTodolistAC = (id: string) =>
	({ type: 'TODOLIST/REMOVE-TODOLIST', payload: { id } } as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
	({ type: 'TODOLIST/CHANGE-TODOLIST-TITLE', payload: { id, title } } as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
	({ type: 'TODOLIST/CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const)
export const setTodolistsAC =
	(todolists: TodolistType[]) => ({
		type: 'TODOLIST/SET-TODOLISTS', payload: { todolists }
	} as const)

export const setTodolistEntityStatusAC = (status: RequestStatusType, id: string) =>
	({ type: 'TODOLIST/SET-TODOLIST-ENTITY-STATUS', payload: { status, id } } as const)

export const clearTodolistDataAC = () => ({ type: 'TODOLIST/CLEAR-TODOLIST-DATA' } as const)

// thunks
export const fetchTodolistsTC = (): AppReducersThunkType => (dispatch) => {
	dispatch(setAppStatusAC(RequestStatusType.LOADING))
	todolistsAPI
		.getTodolists()
		.then((todolists) => {
			dispatch(setTodolistsAC(todolists))
			dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
			return todolists
		})
		.then(todolists => {
			todolists.forEach(td => dispatch(fetchTasksTC(td.id)))
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
				} else handleServerAppError(data, dispatch)
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
						} else handleServerAppError(data, dispatch)
					})
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
						} else handleServerAppError(data, dispatch)
					})
				.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		}

// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ClearTodolistDataActionType = ReturnType<typeof clearTodolistDataAC>

export type TodolistsReducerActionTypes =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| SetAppStatusActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| ReturnType<typeof setTodolistEntityStatusAC>
	| ClearTodolistDataActionType

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType,
	entityStatus: RequestStatusType
}
