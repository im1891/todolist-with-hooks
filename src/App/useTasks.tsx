import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType} from "./App";
import {todolistId1, todolistId2} from "./id-utils";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(ts => ts.id !== id)});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(ts => ts.id === id ? {...ts, isDone: isDone} : ts)})
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(ts => ts.id === id ? {...ts, title: newTitle} : ts)});
    }
 function completelyRemoveTasksForTodolist(todolistId: string) {
     const {[todolistId]: [], ...restKeys} = {...tasks}
     setTasks(restKeys)
    }

    function addStateForNewTodolist(newTodolistId: string)  {
        setTasks({[newTodolistId]: [], ...tasks})
    }
    return {
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist,
    }
}

