import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React, { FC, useState } from 'react'
import { Task, TaskPropsType } from './Task'
import { TaskPriorities, TaskStatuses } from '../../../../todolists-api'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
	title: 'TODOLIST/Task',
	component: Task,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	args: {
		changeTaskStatus: action('changeTaskStatus'),
		changeTaskTitle: action('changeTaskTitle'),
		removeTask: action('removeTask'),
		task: {
			todoListId: '1',
			id: '1',
			title: 'JS',
			addedDate: '',
			deadline: '',
			startDate: '',
			order: 0,
			priority: TaskPriorities.Low,
			description: '',
			status: TaskStatuses.New
		}
	}
}

export default meta
type Story = StoryObj<typeof Task>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
}

export const TaskIsNotDoneStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
	args: {
		task: {
			id: '2',
			title: 'CSS',
			todoListId: '1',
			status: TaskStatuses.New,
			priority: TaskPriorities.Low,
			startDate: '',
			addedDate: '',
			description: '',
			order: 0,
			deadline: ''
		}
	}
}

const TaskWithHook: FC<TaskPropsType> = (args) => {
	const [task, setTask] = useState(args.task)

	const changeTaskStatusHandler = (
		id: string,
		status: TaskStatuses,
		todolistId: string
	) => {
		setTask({ ...task, status })
	}

	const changeTaskTitleHandler = (taskId: string, title: string) => {
		setTask({ ...task, title: title })
	}
	return (
		<Task
			changeTaskStatus={changeTaskStatusHandler}
			changeTaskTitle={changeTaskTitleHandler}
			removeTask={args.removeTask}
			task={task}
			todolistId={args.todolistId}
		/>
	)
}

export const TaskWithChangedStatus: Story = {
	render: (args) => (
		<TaskWithHook
			changeTaskStatus={args.changeTaskStatus}
			changeTaskTitle={args.changeTaskTitle}
			removeTask={args.removeTask}
			task={args.task}
			todolistId={args.todolistId}
		/>
	)
}
