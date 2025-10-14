import {useState} from "react";
import {useLocalStorage} from "./useLocalStorage.ts";
import { v4 as uuidv4 } from 'uuid';
import type {TodoType} from "../types/TodoType.ts";
import {FilterStatus} from "../types/FilterStatusEnum.ts";
import type {TodoContext} from "../types/TodoContext.ts";

export function useTodos(): TodoContext {
    const [todos, setTodos] = useLocalStorage<TodoType[]>('todos', [])
    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);

    const addTodo = (title: string) => {
        if (!title.trim()) return;

        const newTodo: TodoType = {
            id: uuidv4(),
            title: title.trim(),
            completed: false,
            createdAt: new Date(),
        }

        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const toggleTodo = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo= (id: string)=> {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }

    const clearCompletedTodos = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }

    const activeTodosCount = () => {
        return todos.filter(todo => !todo.completed).length;
    }

    // const completedTodosCount = () => {
    //     return todos.filter(todo => todo.completed).length;
    // }


    const sortedTodos = () => {
        return [...filteredTodos()].sort( (a,b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
    }

    const areAllCompleted = () => {
        return todos.length > 0 && todos.every(todo => todo.completed)
    }

    const toggleAllTodos = () => {
        const allCompleted = areAllCompleted();

        setTodos(prevTodos =>
            prevTodos.map(todo => ({
                ...todo,
                completed: !allCompleted,
            }))
        );
    };

    const filteredTodos = () => {
        return todos.filter(todo => {
            if (filter === FilterStatus.ACTIVE) return !todo.completed;
            if (filter === FilterStatus.COMPLETED) return todo.completed;
            if (filter === FilterStatus.ALL) return todo;
            return true;
        })
    }

    const addMockData = () => {
        const mockData: TodoType[] = [
            {
                id: uuidv4(),
                title: 'clean the house',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'got to the store',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'walk the dog',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'go to the gym',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'read a book',
                completed: false,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'write some code',
                completed: false,
                createdAt: new Date(),
            },
        ];
        setTodos((prevTodos) => [...prevTodos, ...mockData]);
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompletedTodos,
        activeTodosCount,
        // completedTodosCount: completedTodosCount(),
        sortedTodos,
        areAllCompleted,
        toggleAllTodos,
        filter,
        setFilter,
        filteredTodos,
        addMockData,
    }
}
