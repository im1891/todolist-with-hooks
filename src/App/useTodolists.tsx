import {useState} from "react";
import {FilterValuesType, TasksStateType, TodolistType} from "./App";
import {todolistId1, todolistId2} from "./id-utils";
import {v1} from "uuid";

export function useTodolists(
    tasks: TasksStateType,
    onTodolistRemoved: (todolistId: string) => void,
    onTodolistAdded: (todolistId: string) => void) {
    let [todolists  , setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: value} : td))
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(td => td.id !== id))
        onTodolistRemoved(id)

    }

    function changeTodolistTitle(id: string, title: string) {
        setTodolists(todolists.map(td => td.id === id ? {...td, title: title} : td))
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
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