import React, { ChangeEvent, useCallback } from 'react'
import { TaskStatuses, TaskType } from '../../../../todolists-api'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

export type TaskPropsType = {
	changeTaskStatus: (
		taskId: string,
		status: TaskStatuses,
		todolistId: string
	) => void
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void
	task: TaskType
	todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
	const onDeleteTaskHandler = () =>
		props.removeTask(props.task.id, props.todolistId)
	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeTaskStatus(
			props.task.id,
			e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
			props.todolistId
		)
	}
	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			props.changeTaskTitle(props.task.id, newValue, props.todolistId)
		},
		[props.task.id, props.changeTaskTitle, props.todolistId]
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

			<EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
			<IconButton onClick={onDeleteTaskHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
