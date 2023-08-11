import React, { ChangeEvent, useEffect, useState } from 'react'
import { Meta } from '@storybook/react'
import {
	TaskPriorities,
	TaskStatuses,
	TaskUpdateType,
	todolistsAPI
} from '../todolists-api'

const meta: Meta = {
	title: 'API/Todolists-API'
}

export default meta

const GetTodolists = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todolistsAPI.getTodolists().then((data) => setState(data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)

	const [title, setTitle] = useState('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onClickHandler = () => {
		todolistsAPI.createTodolist(title).then((data) => setState(data))
	}
	return (
		<div>
			<input
				type="text"
				placeholder={'Enter new todolist title'}
				value={title}
				onChange={onChangeHandler}
			/>
			<button onClick={onClickHandler}>Create todolist</button>
			{JSON.stringify(state)}
		</div>
	)
}

const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.currentTarget.value && setTodolistId(e.currentTarget.value)
	}

	const onClickHandler = () => {
		todolistsAPI.deleteTodolist(todolistId).then((data) => {
			setState(data)
		})
		setTodolistId('')
	}

	return (
		<div>
			<input
				value={todolistId}
				type="text"
				placeholder={'Enter todolist id'}
				onChange={onChangeHandler}
			/>
			<button onClick={onClickHandler}>Delete</button>
			{JSON.stringify(state)}
		</div>
	)
}

const UpdateTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState('')
	const [title, setTitle] = useState('')

	const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTodolistId(e.currentTarget.value)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onClickHandler = () => {
		if (todolistId && title) {
			todolistsAPI
				.updateTodolist(todolistId, title)
				.then((data) => setState(data))
			setTitle('')
			setTodolistId('')
		}
	}

	return (
		<div>
			<input
				type="text"
				placeholder={'Enter todolist id'}
				value={todolistId}
				onChange={onChangeTodolistIdHandler}
			/>
			<input
				type="text"
				placeholder={'Enter new title'}
				value={title}
				onChange={onChangeTitleHandler}
			/>
			<button onClick={onClickHandler}>Update</button>
			{JSON.stringify(state)}
		</div>
	)
}

const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTodolistId(e.currentTarget.value)
	}

	const onclickHandler = () => {
		todolistsAPI.getTasks(todolistId).then((tasks) => setState(tasks))
		setTodolistId('')
	}
	return (
		<div>
			<input
				type="text"
				value={todolistId}
				placeholder={'Enter todolist id'}
				onChange={onChangeHandler}
			/>
			<button onClick={onclickHandler}>Get tasks</button>
			{JSON.stringify(state)}
		</div>
	)
}

const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')
	const [taskId, setTaskId] = useState<string>('')

	const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTodolistId(e.currentTarget.value)
	}

	const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskId(e.currentTarget.value)
	}
	const onclickHandler = () => {
		todolistsAPI.deleteTask(todolistId, taskId).then((data) => setState(data))
		setTodolistId('')
		setTaskId('')
	}
	return (
		<div>
			<input
				type="text"
				value={todolistId}
				placeholder={'Enter todolist id'}
				onChange={onChangeTodolistIdHandler}
			/>
			<input
				type="text"
				value={taskId}
				placeholder={'Enter task id'}
				onChange={onChangeTaskIdHandler}
			/>

			<button onClick={onclickHandler}>Get tasks</button>
			{JSON.stringify(state)}
		</div>
	)
}

const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')
	const [taskTitle, setTaskTitle] = useState<string>('')

	const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTodolistId(e.currentTarget.value)
	}

	const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
	}
	const onclickHandler = () => {
		todolistsAPI
			.createTask(todolistId, taskTitle)
			.then((task) => setState(task))
		setTodolistId('')
		setTaskTitle('')
	}
	return (
		<div>
			<input
				type="text"
				value={todolistId}
				placeholder={'Enter todolist id'}
				onChange={onChangeTodolistIdHandler}
			/>
			<input
				type="text"
				value={taskTitle}
				placeholder={'Enter task title'}
				onChange={onChangeTaskTitleHandler}
			/>

			<button onClick={onclickHandler}>Create task</button>
			{JSON.stringify(state)}
		</div>
	)
}

const UpdateTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState('')
	const [taskId, setTaskId] = useState('')
	const [taskTitle, setTaskTitle] = useState('')

	const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
		setTodolistId(e.currentTarget.value)
	}

	const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskId(e.currentTarget.value)
	}

	const onChangetaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
	}

	const onClikHandler = () => {
		let task: TaskUpdateType = {
			title: taskTitle,
			description: '',
			status: TaskStatuses.New,
			priority: TaskPriorities.Low,
			startDate: '',
			deadline: ''
		}

		todolistsAPI.updateTask(todolistId, taskId, task).then((task) => {
			setState(task)
			setTodolistId('')
			setTaskId('')
			setTaskTitle('')
		})
	}

	return (
		<div>
			<input
				type="text"
				value={todolistId}
				placeholder={'Enter todolist id'}
				onChange={onChangeTodolistId}
			/>
			<input
				type="text"
				value={taskId}
				placeholder={'Enter task id'}
				onChange={onChangeTaskId}
			/>
			<input
				type="text"
				value={taskTitle}
				placeholder={'Enter new task title'}
				onChange={onChangetaskTitle}
			/>
			<button onClick={onClikHandler}>Update task</button>
			{JSON.stringify(state)}
		</div>
	)
}
export const GetTodolistsStory = {
	render: () => <GetTodolists />
}

export const CreateTodolistStory = {
	render: () => <CreateTodolist />
}

export const DeleteTodolistStory = {
	render: () => <DeleteTodolist />
}
export const UpdateTodolistStory = {
	render: () => <UpdateTodolist />
}
export const GetTasksStory = {
	render: () => <GetTasks />
}

export const DeleteTaskStory = {
	render: () => <DeleteTask />
}

export const CreateTaskStory = {
	render: () => <CreateTask />
}

export const UpdateTaskStory = {
	render: () => <UpdateTask />
}
