import { Grid, Paper } from '@mui/material'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import React from 'react'
import { useTodolistsList } from './hooks/useTodolistsList'
import { Navigate } from 'react-router-dom'

type TodolistsListPropsType = {
	demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({ demo = false }) => {
	const {
		todolists,
		tasks,
		changeTodolistTitle,
		removeTask,
		addTask,
		removeTodolist,
		changeFilter,
		changeTaskStatus,
		changeTaskTitle,
		addTodolist,
		isLoggedIn
	} = useTodolistsList(demo)

	if (!isLoggedIn) return <Navigate to={'/login'} />
	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container spacing={3}>
				{todolists.map((tl) => {
					return (
						<Grid item key={tl.id}>
							<Paper style={{ padding: '10px' }}>
								<Todolist
									todolist={tl}
									tasks={tasks[tl.id]}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeTaskStatus}
									removeTodolist={removeTodolist}
									changeTaskTitle={changeTaskTitle}
									changeTodolistTitle={changeTodolistTitle}
									demo={demo}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
