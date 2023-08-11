import {
	addTodolistAC,
	TodolistDomainType,
	todolistsReducer
} from './todolists-reducer'
import { tasksReducer, TasksStateType } from './tasks-reducer'
import { TodolistType } from '../../todolists-api'

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: Array<TodolistDomainType> = []

	const todolist: TodolistType = {
		id: '1',
		title: 'new todolist',
		order: 0,
		addedDate: ''
	}

	const action = addTodolistAC(todolist)

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.payload.todolist.id)
	expect(idFromTodolists).toBe(action.payload.todolist.id)
})
