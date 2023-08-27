import React from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Task } from './Task/Task'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskStatuses, TaskType } from '../../../todolists-api'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'
import { RequestStatusType } from '../../../App/app-reducer'
import { useTodolist } from './hooks/useTodolist'

export type TodolistPropsType = {
	todolist: TodolistDomainType
	tasks: Array<TaskType>
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (
		taskId: string,
		status: TaskStatuses,
		todolistId: string
	) => void
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (todolistId: string, title: string) => void
	demo?: boolean
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({ demo = false, ...props }) => {
	const {
		removeTodolist,
		changeTodolistTitle,
		onAllClickHandler,
		addTask,
		tasksForTodolist,
		onCompletedClickHandler,
		onActiveClickHandler
	} = useTodolist(props, demo)

	return (
		<div>
			<h3>
				<EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
				<IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === RequestStatusType.LOADING}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === RequestStatusType.LOADING} />
			<div>
				{tasksForTodolist.map((t) => (
					<Task
						key={t.id}
						task={t}
						changeTaskStatus={props.changeTaskStatus}
						changeTaskTitle={props.changeTaskTitle}
						removeTask={props.removeTask}
						todolistId={props.todolist.id}
					/>
				))}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
					onClick={onAllClickHandler}
					color={'primary'}
				>
					All
				</Button>
				<Button
					variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color={'success'}
				>
					Active
				</Button>
				<Button
					variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color={'secondary'}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
