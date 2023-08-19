import {
	addTodolistAC,
	setTodolistEntityStatusAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	FilterValuesType,
	removeTodolistAC,
	setTodolistsAC,
	TodolistDomainType,
	todolistsReducer
} from './todolists-reducer'
import { TodolistType } from '../../todolists-api'
import { RequestStatusType } from '../../App/app-reducer'


let startState: Array<TodolistDomainType> = []

beforeEach(() => {
	startState = [
		{
			id: 'todolistId1',
			title: 'What to learn',
			filter: 'all',
			addedDate: '',
			order: 0,
			entityStatus: RequestStatusType.IDLE
		},
		{
			id: 'todolistId2',
			title: 'What to buy',
			filter: 'all',
			addedDate: '',
			order: 0,
			entityStatus: RequestStatusType.IDLE
		}
	]
})

test('correct todolist should be removed', () => {
	const endState = todolistsReducer(startState, removeTodolistAC('todolistId1'))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe('todolistId2')
})

test('correct todolist should be added', () => {
	const todolist: TodolistType = {
		id: 'new todolist',
		title: 'new todolist',
		order: 0,
		addedDate: ''
	}

	const endState = todolistsReducer(startState, addTodolistAC(todolist))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe('new todolist')
	expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	let newTodolistTitle = 'New Todolist'

	const action = changeTodolistTitleAC('todolistId2', newTodolistTitle)

	const endState = todolistsReducer(startState, action)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
	let newFilter: FilterValuesType = 'completed'

	const action = changeTodolistFilterAC('todolistId2', newFilter)

	const endState = todolistsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

test('Todolists should be set to rhe state', () => {
	const action = setTodolistsAC(startState)

	const endState = todolistsReducer([], action)

	expect(endState.length).toBe(2)
})

test('correct entityStatus of todolist  should be changed', () => {
	const endState: TodolistDomainType[] = todolistsReducer(startState, setTodolistEntityStatusAC(RequestStatusType.LOADING, 'todolistId1'))

	expect(endState[0].entityStatus).toBe(RequestStatusType.LOADING)
	expect(endState[1].entityStatus).toBe(RequestStatusType.IDLE)
})
