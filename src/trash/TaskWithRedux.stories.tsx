import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator'
import { TaskWithRedux } from './TaskWithRedux'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../App/store'
import { TaskType } from '../todolists-api'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
	title: 'TODOLIST/TaskWithRedux',
	component: TaskWithRedux,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	decorators: [ReduxStoreProviderDecorator]
}

export default meta
type Story = StoryObj<typeof TaskWithRedux>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskWithReduxWrapper = () => {
	const todolistId = 'todolistId1'
	let task = useSelector<AppRootStateType, TaskType>(
		(state) => state.tasks[todolistId][0]
	)

	return <TaskWithRedux task={task} todolistId={todolistId} />
}
export const TaskWithReduxStories: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args

	render: () => <TaskWithReduxWrapper />
}
