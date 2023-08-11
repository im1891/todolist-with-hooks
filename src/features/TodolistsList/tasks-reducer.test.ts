import {
	addTaskAC,
	removeTaskAC,
	setTasksAC,
	tasksReducer,
	updateTaskAC
} from './tasks-reducer'
import { TasksStateType } from '../../trash/App/App'
import {
	addTodolistAC,
	removeTodolistAC,
	setTodolistsAC
} from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TodolistType } from '../../todolists-api'

let startState: TasksStateType = {}
beforeEach(() => {
	startState = {
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				startDate: '',
				todoListId: 'todolistId1',
				status: TaskStatuses.New,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			},
			{
				id: '2',
				title: 'JS',
				startDate: '',
				todoListId: 'todolistId1',
				status: TaskStatuses.Completed,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			},
			{
				id: '3',
				title: 'React',
				startDate: '',
				todoListId: 'todolistId1',
				status: TaskStatuses.New,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			}
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				startDate: '',
				todoListId: 'todolistId2',
				status: TaskStatuses.New,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			},
			{
				id: '2',
				title: 'milk',
				startDate: '',
				todoListId: 'todolistId2',
				status: TaskStatuses.Completed,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			},
			{
				id: '3',
				title: 'tea',
				startDate: '',
				todoListId: 'todolistId2',
				status: TaskStatuses.New,
				addedDate: '',
				description: '',
				order: 0,
				deadline: '',
				priority: TaskPriorities.Low
			}
		]
	}
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAC('todolistId2', '2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(2)
	expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
})
test('correct task should be added to correct array', () => {
	const action = addTaskAC({
		id: '1',
		title: 'juice',
		startDate: '',
		todoListId: 'todolistId2',
		status: TaskStatuses.New,
		addedDate: '',
		description: '',
		order: 0,
		deadline: '',
		priority: TaskPriorities.Low
	})

	const endState = tasksReducer(
		{
			todolistId1: [],
			todolistId2: []
		},
		action
	)

	expect(endState['todolistId1'].length).toBe(0)
	expect(endState['todolistId2'].length).toBe(1)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
	const action = updateTaskAC('todolistId2', '2', { status: TaskStatuses.New })

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
	const action = updateTaskAC('todolistId2', '2', { title: 'yogurt' })

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].title).toBe('JS')
	expect(endState['todolistId2'][1].title).toBe('yogurt')
	expect(endState['todolistId2'][0].title).toBe('bread')
})
test('new array should be added when new todolist is added', () => {
	const todolist: TodolistType = {
		id: 'todolistId3',
		title: 'new todolist',
		order: 0,
		addedDate: ''
	}

	const action = addTodolistAC(todolist)

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
test('propertry with todolistId should be deleted', () => {
	const action = removeTodolistAC('todolistId2')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})

test('Empty arrays shoud be added when we set todolists', () => {
	const action = setTodolistsAC([
		{ id: '1', title: 'title 1', addedDate: '', order: 0 },
		{ id: '2', title: 'title 2', addedDate: '', order: 0 }
	])

	const endState = tasksReducer({}, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(2)
	expect(keys[0]).toBe('1')
	expect(keys[1]).toBe('2')
	expect(endState['1']).toEqual([])
	expect(endState['2']).toEqual([])
})

test('tasks should be added for todolist', () => {
	const action = setTasksAC('todolistId1', startState['todolistId1'])

	const endState = tasksReducer(
		{
			todolistId1: [],
			todolistId2: []
		},
		action
	)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(0)
})
