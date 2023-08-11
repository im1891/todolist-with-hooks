import { useState } from 'react'
import { v1 } from 'uuid'
import { todolistId1, todolistId2 } from '../id-utils'
import { TasksStateType } from '../App'
import { TaskPriorities, TaskStatuses, TaskType } from '../../../todolists-api'

export function useTasks() {
	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: todolistId1,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: v1(),
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: todolistId1,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		],
		[todolistId2]: [
			{
				id: v1(),
				title: 'Milk',
				status: TaskStatuses.Completed,
				todoListId: todolistId2,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: v1(),
				title: 'React Book',
				status: TaskStatuses.Completed,
				todoListId: todolistId2,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		]
	})

	function removeTask(id: string, todolistId: string) {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].filter((ts) => ts.id !== id)
		})
	}

	function addTask(title: string, todolistId: string) {
		let task: TaskType = {
			id: v1(),
			title: title,
			status: TaskStatuses.New,
			todoListId: todolistId,
			description: '',
			startDate: '',
			deadline: '',
			addedDate: '',
			order: 0,
			priority: TaskPriorities.Low
		}
		setTasks({ ...tasks, [todolistId]: [task, ...tasks[todolistId]] })
	}

	function changeTaskStatus(
		id: string,
		status: TaskStatuses,
		todolistId: string
	) {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map((ts) =>
				ts.id === id ? { ...ts, status } : ts
			)
		})
	}

	function changeTaskTitle(id: string, title: string, todolistId: string) {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map((ts) =>
				ts.id === id
					? {
							...ts,
							title: title
					  }
					: ts
			)
		})
	}

	function completelyRemoveTasksForTodolist(todolistId: string) {
		const {
			[todolistId]: [],
			...restKeys
		} = { ...tasks }
		setTasks(restKeys)
	}

	function addStateForNewTodolist(newTodolistId: string) {
		setTasks({ [newTodolistId]: [], ...tasks })
	}

	return {
		tasks,
		removeTask,
		addTask,
		changeTaskStatus,
		changeTaskTitle,
		completelyRemoveTasksForTodolist,
		addStateForNewTodolist
	}
}
