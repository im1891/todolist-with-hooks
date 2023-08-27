import { useCallback } from 'react'
import { TaskStatuses } from '../../../../todolists-api'
import { TodolistPropsType } from '../Todolist'

export const useTodolist = (props: TodolistPropsType, demo: boolean) => {

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.todolist.id)
		},
		[props.addTask, props.todolist.id]
	)

	const removeTodolist = () => {
		props.removeTodolist(props.todolist.id)
	}
	const changeTodolistTitle = useCallback(
		(title: string) => {
			props.changeTodolistTitle(props.todolist.id, title)
		},
		[props.todolist.id, props.changeTodolistTitle]
	)

	const onAllClickHandler = useCallback(
		() => props.changeFilter('all', props.todolist.id),
		[props.changeFilter, props.todolist.id]
	)
	const onActiveClickHandler = useCallback(
		() => props.changeFilter('active', props.todolist.id),
		[props.changeFilter, props.todolist.id]
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeFilter('completed', props.todolist.id),
		[props.changeFilter, props.todolist.id]
	)

	let tasksForTodolist = props.tasks

	if (props.todolist.filter === 'active') {
		tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
	}
	if (props.todolist.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(
			(t) => t.status === TaskStatuses.Completed
		)
	}

	return {
		addTask,
		removeTodolist,
		changeTodolistTitle,
		onAllClickHandler,
		onActiveClickHandler,
		onCompletedClickHandler,
		tasksForTodolist
	}
}