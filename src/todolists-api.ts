import axios, { AxiosResponse } from 'axios'
import { AxiosError } from 'axios/index'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		['API-KEY']: 'fabd923c-84e3-4fc6-9742-c9c4e25be34f'
	}
})

// api
export const todolistsAPI = {
	getTodolists() {
		return instance
			.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
			.then(res => res.data)
	},

	createTodolist(title: string) {
		return instance
			.post<null, AxiosResponse<ResponseType<{ item: TodolistType }>>,
				{ title: string }>('todo-lists', { title })
			.then(res => res.data)
	},

	deleteTodolist(todolistId: string) {
		return instance
			.delete<ResponseType, AxiosResponse<ResponseType>>
			(`todo-lists/${todolistId}`)
			.then(res => res.data)
	},

	updateTodolist(todolistId: string, title: string) {
		return instance
			.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>
			(`todo-lists/${todolistId}`, { title })
			.then(res => res.data)
	},

	getTasks(todolistId: string) {
		return instance
			.get<GetTasksType, AxiosResponse<GetTasksType>>
			(`todo-lists/${todolistId}/tasks`)
			.then(res => res.data.items)
	},

	deleteTask(todolistId: string, taskId: string) {
		return instance
			.delete<ResponseType, AxiosResponse<ResponseType>>
			(`todo-lists/${todolistId}/tasks/${taskId}`)
			.then(res => res.data)
	},

	createTask(todolistId: string, title: string) {
		return instance
			.post<ResponseType<{ item: TaskType }>,
				AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>
			(`/todo-lists/${todolistId}/tasks`, { title })
			.then(res => res.data)
	},

	updateTask(todolistId: string, taskId: string, task: TaskUpdateType) {
		return instance
			.put<ResponseType<{ item: TaskType }>,
				AxiosResponse<ResponseType<{ item: TaskType }>>, TaskUpdateType>
			(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
			.then(res => res.data)
	}
}

export const authApi = {
	login(logData: LoginParams) {
		return instance
			.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
				userId: number
			}>>, LoginParams>('auth/login', logData)
			.then(res => res.data)
	},

	logout() {
		return instance
			.delete<ResponseType, AxiosResponse<ResponseType>>('/auth/login')
			.then(res => res.data)
	},

	me() {
		return instance.get<ResponseType<{
			id: number,
			email: string,
			login: string
		}>, AxiosResponse<ResponseType<{
			id: number,
			email: string,
			login: string
		}>>>('/auth/me').then(res => res.data)
	}
}

///// types
export type TodolistType = {
	id: string
	addedDate: string
	order: number
	title: string
}

export enum ResultCodes {
	OK = 0,
	ERROR = 1,
	ERROR_CAPTCHA = 10
}

export type ResponseType<T = {}> = {
	data: T
	resultCode: ResultCodes
	messages: string[]
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

type GetTasksType = {
	items: TaskType[]
	totalCount: number
	error: string | null
}

export type TaskUpdateType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}

export type AxiosErrorType = AxiosError<{ message: string }>

export type LoginParams = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha?: string
}