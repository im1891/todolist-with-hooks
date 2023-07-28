import { v1 } from 'uuid'
import {
	AddTodolistActionType,
	RemoveTodolistActionType
} from './todolists-reducer'
import { TasksStateType } from '../AppWithRedux/AppWithRedux'
import { TaskPriorities, TaskStatuses, TaskType } from '../todolists-api'

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistId: string
	taskId: string
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(
					(ts) => ts.id !== action.taskId
				)
			}
		}
		case 'ADD-TASK': {
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				todoListId: action.todolistId,
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: '',
				status: TaskStatuses.New,
				description: '',
				priority: TaskPriorities.Low
			}

			return {
				...state,
				[action.todolistId]: [newTask, ...state[action.todolistId]]
			}
		}
		case 'CHANGE-TASK-STATUS': {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map((ts) =>
					ts.id === action.taskId
						? {
								...ts,
								status: action.status
						  }
						: ts
				)
			}
		}
		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map((ts) =>
					ts.id === action.taskId
						? {
								...ts,
								title: action.title
						  }
						: ts
				)
			}
		}
		case 'ADD-TODOLIST': {
			return { ...state, [action.todolistId]: [] }
		}
		case 'REMOVE-TODOLIST': {
			let {
				[action.id]: [],
				...restKeys
			} = { ...state }
			return restKeys
		}
		default:
			return state
	}
}

export const removeTaskAC = (
	taskId: string,
	todolistId: string
): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (title: string, todolistId: string) => {
	return { type: 'ADD-TASK', title, todolistId } as const
}
export const changeTaskStatusAC = (
	taskId: string,
	status: TaskStatuses,
	todolistId: string
) => {
	return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId } as const
}
export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
) => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const
}
