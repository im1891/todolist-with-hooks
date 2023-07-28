import { useState } from 'react'
import { TasksStateType } from './App'
import { todolistId1, todolistId2 } from './id-utils'
import { v1 } from 'uuid'
import {
	FilterValuesType,
	TodolistDomainType
} from '../state/todolists-reducer'

export function useTodolists(
	tasks: TasksStateType,
	onTodolistRemoved: (todolistId: string) => void,
	onTodolistAdded: (todolistId: string) => void
) {
	let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			addedDate: '',
			order: 0
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			addedDate: '',
			order: 0
		}
	])

	function changeFilter(value: FilterValuesType, todolistId: string) {
		setTodolists(
			todolists.map((td) =>
				td.id === todolistId ? { ...td, filter: value } : td
			)
		)
	}

	function removeTodolist(id: string) {
		setTodolists(todolists.filter((td) => td.id !== id))
		onTodolistRemoved(id)
	}

	function changeTodolistTitle(id: string, title: string) {
		setTodolists(
			todolists.map((td) => (td.id === id ? { ...td, title: title } : td))
		)
	}

	function addTodolist(title: string) {
		let newTodolistId = v1()
		let newTodolist: TodolistDomainType = {
			id: newTodolistId,
			title: title,
			filter: 'all',
			order: 0,
			addedDate: ''
		}
		setTodolists([newTodolist, ...todolists])
		onTodolistAdded(newTodolistId)
	}

	return {
		todolists,
		changeFilter,
		removeTodolist,
		changeTodolistTitle,
		addTodolist
	}
}
