import TextField from '@mui/material/TextField/TextField'
import React from 'react'
import { IconButton } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { useAddItemForm } from './hooks/useAddItemForm'

export type AddItemFormPropsType = {
	addItem: (title: string) => void
	disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ addItem, disabled = false }) => {
	const { title, error, onKeyPressHandler, onChangeHandler, onAddItemHandler } =
		useAddItemForm(addItem)

	return (
		<div>
			<TextField
				disabled={disabled}
				variant='outlined'
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressHandler}
				label='Title'
				helperText={error}
			/>
			<IconButton color='primary' onClick={onAddItemHandler} disabled={disabled}>
				<AddBox />
			</IconButton>
		</div>
	)
})
