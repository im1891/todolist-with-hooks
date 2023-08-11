import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Task } from './Task/Task'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskStatuses, TaskType } from '../../../todolists-api'
import { FilterValuesType } from '../todolists-reducer'
import { useAppDispatch } from '../../../App/store'
import { fetchTasksTC } from '../tasks-reducer'

type PropsType = {
	id: string
	title: string
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
	filter: FilterValuesType
}

export const Todolist = React.memo(function (props: PropsType) {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchTasksTC(props.id))
	}, [])

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id)
		},
		[props.addTask, props.id]
	)

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = useCallback(
		(title: string) => {
			props.changeTodolistTitle(props.id, title)
		},
		[props.id, props.changeTodolistTitle]
	)

	const onAllClickHandler = useCallback(
		() => props.changeFilter('all', props.id),
		[props.changeFilter, props.id]
	)
	const onActiveClickHandler = useCallback(
		() => props.changeFilter('active', props.id),
		[props.changeFilter, props.id]
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeFilter('completed', props.id),
		[props.changeFilter, props.id]
	)

	let tasksForTodolist = props.tasks

	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(
			(t) => t.status === TaskStatuses.Completed
		)
	}

	return (
		<div>
			<h3>
				<EditableSpan value={props.title} onChange={changeTodolistTitle} />
				<IconButton onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<div>
				{tasksForTodolist.map((t) => (
					<Task
						task={t}
						changeTaskStatus={props.changeTaskStatus}
						changeTaskTitle={props.changeTaskTitle}
						removeTask={props.removeTask}
						todolistId={props.id}
						key={t.id}
					/>
				))}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					variant={props.filter === 'all' ? 'outlined' : 'text'}
					onClick={onAllClickHandler}
					color={'inherit'}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color={'primary'}
				>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color={'secondary'}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
