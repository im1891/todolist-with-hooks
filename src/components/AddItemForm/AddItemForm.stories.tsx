import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm, AddItemFormPropsType } from './AddItemForm'
import { action } from '@storybook/addon-actions'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField/TextField'
import { IconButton } from '@mui/material'
import { AddBox } from '@mui/icons-material'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
	title: 'TODOLIST/AddItemForm',
	component: AddItemForm,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	args: {
		addItem: action('clicked')
	},
	argTypes: {
		addItem: {
			description: 'Button clicked inside form'
			//     action: 'clicked'
		}
	}
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
}

export const AddItemFormDisabledStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
	args: {
		disabled: true
	}
}
const AddItemWithError = (props: AddItemFormPropsType) => {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>('Title is required')

	const onAddItemHandler = () => {
		if (title.trim() !== '') {
			props.addItem(title)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.key === 'Enter') {
			onAddItemHandler()
		}
	}

	return (
		<div>
			<TextField
				variant='outlined'
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressHandler}
				label='Title'
				helperText={error}
			/>
			<IconButton color='primary' onClick={onAddItemHandler}>
				<AddBox />
			</IconButton>
		</div>
	)
}

export const AddItemFormErrorStory: Story = {
	render: () => <AddItemWithError addItem={action('clicked')} />
}
