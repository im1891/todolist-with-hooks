import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../components/EditableSpan/EditableSpan'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {
	removeTaskAC,
	updateTaskTC
} from '../features/TodolistsList/tasks-reducer'
import { TaskStatuses, TaskType } from '../todolists-api'
import { useAppDispatch } from '../App/store'

export type TaskPropsType = {
	task: TaskType
	todolistId: string
}
export const TaskWithRedux = React.memo((props: TaskPropsType) => {
	const dispatch = useAppDispatch()

	const onClickHandler = () =>
		dispatch(removeTaskAC(props.task.id, props.todolistId))

	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			updateTaskTC(props.todolistId, props.task.id, {
				status: e.currentTarget.checked
					? TaskStatuses.Completed
					: TaskStatuses.New
			})
		)
	}

	const onChangeTitleHandler = useCallback(
		(value: string) => {
			dispatch(updateTaskTC(props.todolistId, props.task.id, { title: value }))
		},
		[props.task.id, props.todolistId]
	)

	return (
		<div
			key={props.task.id}
			className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
		>
			<Checkbox
				checked={props.task.status === TaskStatuses.Completed}
				color="primary"
				onChange={onChangeStatusHandler}
			/>

			<EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
			<IconButton onClick={onClickHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
