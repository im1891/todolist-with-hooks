import { v1 } from 'uuid'
import { TodolistType } from '../todolists-api'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<
	typeof changeTodolistTitleAC
>
export type ChangeTodolistFilterActionType = ReturnType<
	typeof changeTodolistFilterAC
>

type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: ActionsType
): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter((tl) => tl.id != action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				{
					id: action.todolistId,
					title: action.title,
					filter: 'all',
					addedDate: '',
					order: 0
				},
				...state
			]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			return state.map((td) =>
				td.id === action.id ? { ...td, title: action.title } : td
			)
		}
		case 'CHANGE-TODOLIST-FILTER': {
			return state.map((td) =>
				td.id === action.id ? { ...td, filter: action.filter } : td
			)
		}
		default:
			return state
	}
}

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string) => {
	return { type: 'ADD-TODOLIST', title: title, todolistId: v1() } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title } as const
}
export const changeTodolistFilterAC = (
	id: string,
	filter: FilterValuesType
) => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const
}
