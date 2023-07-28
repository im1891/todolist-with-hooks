import React from 'react'
import '../App.css'
import { Todolist } from '../Todolist'
import { AddItemForm } from '../AddItemForm/AddItemForm'
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
import { useTodolists } from './useTodolists'
import { useTasks } from './useTasks'
import { TaskStatuses, TaskType } from '../todolists-api'

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	const {
		tasks,
		changeTaskTitle,
		removeTask,
		addTask,
		changeStatus,
		completelyRemoveTasksForTodolist,
		addStateForNewTodolist
	} = useTasks()

	const {
		todolists,
		changeFilter,
		removeTodolist,
		changeTodolistTitle,
		addTodolist
	} = useTodolists(
		tasks,
		completelyRemoveTasksForTodolist,
		addStateForNewTodolist
	)

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

export default App
