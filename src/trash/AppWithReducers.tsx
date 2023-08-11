import React, { useReducer } from 'react'
import '../App/App.css'
import { v1 } from 'uuid'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	FilterValuesType,
	removeTodolistAC,
	todolistsReducer
} from '../features/TodolistsList/todolists-reducer'
import {
	addTaskAC,
	removeTaskAC,
	tasksReducer,
	updateTaskAC
} from '../features/TodolistsList/tasks-reducer'
import { Todolist } from '../features/TodolistsList/Todolist/Todolist'
import { TaskPriorities, TaskStatuses, TodolistType } from '../todolists-api'

function AppWithReducers() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			order: 0,
			addedDate: ''
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			order: 0,
			addedDate: ''
		}
	])

	let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
		[todolistId1]: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.New,
				todoListId: todolistId1,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: v1(),
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: todolistId1,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		],
		[todolistId2]: [
			{
				id: v1(),
				title: 'Milk',
				status: TaskStatuses.New,
				todoListId: todolistId2,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: v1(),
				title: 'React Book',
				status: TaskStatuses.New,
				todoListId: todolistId2,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		]
	})

	function removeTask(id: string, todolistId: string) {
		const action = removeTaskAC(id, todolistId)
		dispatchToTasks(action)
	}

	function addTask(title: string, todolistId: string) {
		const newtask = {
			id: '1',
			title: title,
			startDate: '',
			todoListId: todolistId,
			status: TaskStatuses.New,
			addedDate: '',
			description: '',
			order: 0,
			deadline: '',
			priority: TaskPriorities.Low
		}

		const action = addTaskAC(newtask)
		dispatchToTasks(action)
	}

	function changeStatus(
		taskId: string,
		status: TaskStatuses,
		todolistId: string
	) {
		const action = updateTaskAC(todolistId, taskId, { status })
		dispatchToTasks(action)
	}

	function changeTaskTitle(taskId: string, title: string, todolistId: string) {
		const action = updateTaskAC(todolistId, taskId, { title })
		dispatchToTasks(action)
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		const action = changeTodolistFilterAC(todolistId, value)
		dispatchToTodolists(action)
	}

	function removeTodolist(id: string) {
		const action = removeTodolistAC(id)
		dispatchToTasks(action)
		dispatchToTodolists(action)
	}

	function changeTodolistTitle(id: string, title: string) {
		const action = changeTodolistTitleAC(id, title)
		dispatchToTodolists(action)
	}

	function addTodolist(title: string) {
		const todolist: TodolistType = {
			id: 'todolistId3',
			title: 'new todolist',
			order: 0,
			addedDate: ''
		}
		const action = addTodolistAC(todolist)
		dispatchToTasks(action)
		dispatchToTodolists(action)
	}

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">News</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map((tl) => {
						let allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(
								(t) => t.status === TaskStatuses.New
							)
						}
						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(
								(t) => t.status === TaskStatuses.Completed
							)
						}

						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducers
