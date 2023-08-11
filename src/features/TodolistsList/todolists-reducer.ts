import { todolistsAPI, TodolistType } from '../../todolists-api'
import { ThunkAction } from 'redux-thunk'
import { AppRootStateType } from '../../App/store'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: TodolistsReducerActionTypes
): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'ADD-TODOLIST':
			return [{ ...action.payload.todolist, filter: 'all' }, ...state]

		case 'REMOVE-TODOLIST':
			return state.filter((tl) => tl.id != action.payload.id)

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
			return action.payload.todolists.map((td) => ({ ...td, filter: 'all' }))

		default:
			return state
	}
}

///// actions
export const addTodolistAC = (todolist: TodolistType) =>
	({
		type: 'ADD-TODOLIST',
		payload: {
			todolist
		}
	} as const)

export const removeTodolistAC = (id: string) =>
	({
		type: 'REMOVE-TODOLIST',
		payload: {
			id
		}
	} as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
	({
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {
			id,
			title
		}
	} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
	({ type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
	({
		type: 'SET-TODOLISTS',
		payload: {
			todolists
		}
	} as const)

///// thunks
export const fetchTodolistsTC = (): TodolistReducerThunkType => (dispatch) => {
	todolistsAPI
		.getTodolists()
		.then((todolists) => dispatch(setTodolistsAC(todolists)))
}

export const deleteTodolistTC =
	(id: string): TodolistReducerThunkType =>
	async (dispatch) => {
		const res = await todolistsAPI.deleteTodolist(id)
		res.resultCode === 0 && dispatch(removeTodolistAC(id))
		/*todolistsAPI
							.deleteTodolist(id)
							.then((res) => res.resultCode === 0 && dispatch(removeTodolistAC(id)))*/
	}

export const addTodolistTC =
	(title: string): TodolistReducerThunkType =>
	(dispatch) => {
		todolistsAPI
			.createTodolist(title)
			.then(
				(res) => res.resultCode === 0 && dispatch(addTodolistAC(res.data.item))
			)
	}

export const changeTodolistTitleTC =
	(id: string, title: string): TodolistReducerThunkType =>
	(dispatch) => {
		todolistsAPI
			.updateTodolist(id, title)
			.then(
				(res) =>
					res.resultCode === 0 && dispatch(changeTodolistTitleAC(id, title))
			)
	}

///// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistsReducerActionTypes =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistReducerThunkType = ThunkAction<
	void,
	AppRootStateType,
	unknown,
	TodolistsReducerActionTypes
>

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}
