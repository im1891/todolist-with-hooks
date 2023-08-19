import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer'
import { ResultCodes, TaskPriorities, TaskStatuses, TaskType, TaskUpdateType, todolistsAPI } from '../../todolists-api'
import { AppReducersThunkType, AppRootStateType } from '../../App/store'
import { RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../App/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { AxiosError } from 'axios'

const initialState: TasksStateType = {}

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: TasksReducerActionTypes
): TasksStateType => {
	switch (action.type) {
		case 'ADD-TASK':
			return {
				...state,
				[action.payload.task.todoListId]: [
					action.payload.task,
					...state[action.payload.task.todoListId]
				]
			}

		case 'REMOVE-TASK':
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(
					(ts) => ts.id !== action.payload.taskId
				)
			}

		case 'ADD-TODOLIST':
			return { ...state, [action.payload.todolist.id]: [] }

		case 'REMOVE-TODOLIST':
			let {
				[action.payload.id]: [],
				...restKeys
			} = { ...state }

			return restKeys

		case 'SET-TODOLISTS':
			return action.payload.todolists.reduce(
				(acc, td) => {
					acc[td.id] = []
					return acc
				},
				{ ...state }
			)

		case 'SET-TASKS':
			return {
				...state,
				[action.payload.todolistId]: action.payload.tasks
			}

		case 'UPDATE-TASK':
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(
					(ts) =>
						ts.id === action.payload.taskId
							? { ...ts, ...action.payload.taskUpdateModel }
							: ts
				)
			}

		default:
			return state
	}
}

// actions
export const addTaskAC = (task: TaskType) =>
	({ type: 'ADD-TASK', payload: { task } } as const)

export const removeTaskAC = (todolistId: string, taskId: string) =>
	({ type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
	({ type: 'SET-TASKS', payload: { todolistId, tasks } } as const)

export const updateTaskAC = (todolistId: string, taskId: string,
														 taskUpdateModel: TaskUpdateModelType) =>
	({
		type: 'UPDATE-TASK', payload: { todolistId, taskId, taskUpdateModel }
	} as const)

///// thunks
export const fetchTasksTC = (todolistId: string): AppReducersThunkType =>
	(dispatch) => {
		dispatch(setAppStatusAC(RequestStatusType.LOADING))
		todolistsAPI
			.getTasks(todolistId)
			.then((tasks) => {
				dispatch(setTasksAC(todolistId, tasks))
				dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
			})
			.catch((e: AxiosErrorType) => {
				handleServerNetworkError(e, dispatch)
			})
	}

export const deleteTaskTC =
	(todolistId: string, taskId: string): AppReducersThunkType =>
		(dispatch) => {
			todolistsAPI
				.deleteTask(todolistId, taskId)
				.then((data) => {
					if (data.resultCode === ResultCodes.OK) {
						dispatch(removeTaskAC(todolistId, taskId))
					} else {
						handleServerAppError(data, dispatch)
					}
				})
				.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		}

export const addTaskTC =
	(todolistId: string, title: string): AppReducersThunkType =>
		(dispatch) => {
			dispatch(setAppStatusAC(RequestStatusType.LOADING))
			todolistsAPI
				.createTask(todolistId, title)
				.then((data) => {
					if (data.resultCode === ResultCodes.OK) {
						dispatch(addTaskAC(data.data.item))
						dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
					} else {
						handleServerAppError(data, dispatch)
					}
				})
				.catch((e: AxiosErrorType) => {
					handleServerNetworkError(e, dispatch)
				})
		}

export const updateTaskTC =
	(
		todolistId: string,
		taskId: string,
		taskUpdateModel: TaskUpdateModelType
	): AppReducersThunkType =>
		(dispatch, getState: () => AppRootStateType) => {
			const task = getState().tasks[todolistId].find((ts) => ts.id === taskId)

			if (!task) {
				console.warn('task not found in the state')
				return
			}

			const taskApiModel: TaskUpdateType = {
				status: task.status,
				title: task.title,
				startDate: task.startDate,
				priority: task.priority,
				deadline: task.deadline,
				description: task.description,
				...taskUpdateModel
			}

			dispatch(setAppStatusAC(RequestStatusType.LOADING))
			todolistsAPI
				.updateTask(todolistId, taskId, taskApiModel)
				.then(
					(data) => {
						if (data.resultCode === ResultCodes.OK) {
							dispatch(updateTaskAC(todolistId, taskId, taskApiModel))
							dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
						} else {
							handleServerAppError(data, dispatch)
						}

					}
				)
				.catch((e: AxiosErrorType) => handleServerNetworkError(e, dispatch))
		}

// types
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export type TasksReducerActionTypes =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof setTasksAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof removeTaskAC>
	| SetAppErrorActionType
	| SetAppStatusActionType

type TaskUpdateModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

export type AxiosErrorType = AxiosError<{ message: string }>
