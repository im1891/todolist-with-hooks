import { Grid, Paper } from '@mui/material'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import React from 'react'
import { useTodolistsList } from './hooks/useTodolistsList'

export const TodolistsList: React.FC = () => {
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
		addTodolist
	} = useTodolistsList()

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
									id={tl.id}
									title={tl.title}
									tasks={tasks[tl.id]}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeTaskStatus}
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
		</>
	)
}
