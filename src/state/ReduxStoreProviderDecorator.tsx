import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: "todolistId1",
            title: "What to learn",
            filter: "all",

        },
        {
            id: "todolistId2",
            title: "What to buy",
            filter: "all",
        },
    ],

    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                isDone: true
            },
            {
                id: v1(),
                title: "JS",
                isDone: false
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                isDone: true
            },
            {
                id: v1(),
                title: "React Book",
                isDone: false
            },
        ],
    },
};

const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (Story: () => JSX.Element) => {
    return <Provider store={storyBookStore}>
        <Story/>
    </Provider>
}