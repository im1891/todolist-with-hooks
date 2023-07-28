import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, { ChangeEvent } from 'react'
import { EditableSpan } from './EditableSpan'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import {
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC
} from './state/tasks-reducer'
import { TaskStatuses, TaskType } from './todolists-api'

export type TaskPropsType = {
	task: TaskType
	todolistId: string
}
export const TaskWithRedux = React.memo((props: TaskPropsType) => {
	const dispatch = useDispatch()

	const onClickHandler = () =>
		dispatch(removeTaskAC(props.task.id, props.todolistId))

	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			changeTaskStatusAC(
				props.task.id,
				e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
				props.todolistId
			)
		)
	}

	const onChangeTitleHandler = (value: string) => {
		dispatch(changeTaskTitleAC(props.task.id, value, props.todolistId))
	}

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
