import { tasksReducer, TasksReducerActionTypes } from '../features/TodolistsList/tasks-reducer'
import { todolistsReducer, TodolistsReducerActionTypes } from '../features/TodolistsList/todolists-reducer'
import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer, AppReducerActionsType } from './app-reducer'
import { authReducer, LoginReducerActionsType } from '../features/Login/auth-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})
// непосредственно создаём store
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () =>
	useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
	useSelector

export type AppReducersThunkType = ThunkAction<
	void,
	AppRootStateType,
	unknown,
	TasksReducerActionTypes | TodolistsReducerActionTypes | LoginReducerActionsType | AppReducerActionsType
>

export type AppActionTypes = TodolistsReducerActionTypes | TasksReducerActionTypes | AppReducerActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
