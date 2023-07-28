import axios, { AxiosResponse } from 'axios'

export type TodolistType = {
	id: string
	addedDate: string
	order: number
	title: string
}

type ResponseType<T = {}> = {
	data: T
	resultCode: number
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

export type UpdateTaskType = {
	title: string
	description: string
	status: TaskStatuses
	priority: number
	startDate: string
	deadline: string
}
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		['API-KEY']: 'fabd923c-84e3-4fc6-9742-c9c4e25be34f'
	}
})

export const todolistsAPI = {
	getTodolists() {
		return instance
			.get<TodolistType[]>('todo-lists')
			.then((res: AxiosResponse<TodolistType[]>) => res.data)
	},

	createTodolist(title: string) {
		return instance
			.post<
				ResponseType<{
					item: TodolistType
				}>
			>('todo-lists', { title })
			.then(
				(res: AxiosResponse<ResponseType<{ item: TodolistType }>>) => res.data
			)
	},

	deleteTodolist(id: string) {
		return instance
			.delete<ResponseType>(`todo-lists/${id}`)
			.then((res: AxiosResponse) => res.data)
	},

	updateTodolist(id: string, title: string) {
		return instance
			.put<ResponseType>(`todo-lists/${id}`, { title })
			.then((res: AxiosResponse<ResponseType>) => res.data)
	},

	getTasks(todolistId: string) {
		return instance
			.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
			.then((res: AxiosResponse<GetTasksType>) => {
				return res.data.items
			})
	},

	deleteTask(todolistId: string, taskId: string) {
		return instance
			.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
			.then((res: AxiosResponse<ResponseType>) => res.data)
	},

	createTask(todolistId: string, title: string) {
		return instance
			.post<ResponseType<{ item: TaskType }>>(
				`/todo-lists/${todolistId}/tasks`,
				{ title }
			)
			.then(
				(res: AxiosResponse<ResponseType<{ item: TaskType }>>) =>
					res.data.data.item
			)
	},

	updateTask(todolistId: string, taskId: string, task: UpdateTaskType) {
		return instance
			.put<ResponseType<{ item: TaskType }>>(
				`/todo-lists/${todolistId}/tasks/${taskId}`,
				task
			)
			.then(
				(res: AxiosResponse<ResponseType<{ item: TaskType }>>) =>
					res.data.data.item
			)
	}
}
