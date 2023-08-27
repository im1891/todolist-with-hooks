import { Provider } from 'react-redux'
import { AppRootStateType } from '../App/store'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../todolists-api'
import { appReducer, RequestStatusType } from '../App/app-reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from '../features/Login/auth-reducer'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})

const initialGlobalState: AppRootStateType = {
	todolists: [
		{
			id: 'todolistId1',
			title: 'What to learn',
			filter: 'all',
			addedDate: '',
			order: 0,
			entityStatus: RequestStatusType.IDLE
		},
		{
			id: 'todolistId2',
			title: 'What to buy',
			filter: 'all',
			addedDate: '',
			order: 0,
			entityStatus: RequestStatusType.LOADING
		}
	],

	tasks: {
		'todolistId1': [
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
		'todolistId2': [
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
	},
	app: {
		status: RequestStatusType.IDLE,
		error: null,
		isInitialized: false
	},
	auth: {
		isLoggedIn: false
	}
}

const storyBookStore = createStore(
	rootReducer, initialGlobalState as AppRootStateType, composeWithDevTools(applyMiddleware(thunk))
)
export const ReduxStoreProviderDecorator = (Story: () => ReactNode) => {
	return (

		<MemoryRouter>
			<Provider store={storyBookStore}>
				<Story />
			</Provider>
		</MemoryRouter>
	)
}
