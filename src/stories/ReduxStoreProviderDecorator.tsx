import { Provider } from 'react-redux'
import { AppRootStateType } from '../App/store'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../todolists-api'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})

const initialGlobalState: AppRootStateType = {
	todolists: [
		{
			id: 'todolistId1',
			title: 'What to learn',
			filter: 'all',
			addedDate: '',
			order: 0
		},
		{
			id: 'todolistId2',
			title: 'What to buy',
			filter: 'all',
			addedDate: '',
			order: 0
		}
	],

	tasks: {
		['todolistId1']: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
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
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		],
		['todolistId2']: [
			{
				id: v1(),
				title: 'Milk',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
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
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		]
	}
}

const storyBookStore = createStore(
	rootReducer,
	initialGlobalState as AppRootStateType
)
export const ReduxStoreProviderDecorator = (Story: () => JSX.Element) => {
	return (
		<Provider store={storyBookStore}>
			<Story />
		</Provider>
	)
}
