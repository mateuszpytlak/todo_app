import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import {useState} from "react";
import type {TodoType} from "../../types/TodoType.ts";

export const TodoApp = () => {
    const todosMock = [
        {
            id: 1,
            title: 'clean the house',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'got to the store',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 3,
            title: 'walk the dog',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 4,
            title: 'go to the gym',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 5,
            title: 'read a book',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 6,
            title: 'write some code',
            completed: false,
            createdAt: new Date(),
        },

    ];
    const [todos, setTodos] = useState<TodoType[]>(todosMock);

    const handleAddTodoItem = (newTodo: string) => {
        const newTodoItem: TodoType = {
            id: todos.length + 1,
            title: newTodo,
            completed: false,
            createdAt: new Date(),
        };
        setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    }

    const handleDeleteTodo = (index: number) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    }

    const handleToggleTodo = (id: number) => {
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos];
            const index = updatedTodos.findIndex((todo) => todo.id === id);
            if (index !== -1) {
                updatedTodos[index].completed = !updatedTodos[index].completed;
            }
            return updatedTodos;
        });
    }

    return (
        <>
            <TodoForm setTodos={handleAddTodoItem}/>
            <TodoList todoList={todos} removeItem={handleDeleteTodo} handleToggleTodo={handleToggleTodo} />
        </>
    )
}
