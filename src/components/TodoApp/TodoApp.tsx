import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import type {TodoType} from "../../types/TodoType.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import { v4 as uuidv4 } from 'uuid';

export const TodoApp = () => {
    const [todoList, setTodoList] = useLocalStorage<TodoType[]>('todos', []);
    const handleAddMockData = () => {
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

        setTodoList((prevTodos) => [...prevTodos, ...mockData]);
    };


    const handleAddTodoItem = (newTodo: string) => {
        const newTodoItem: TodoType = {
            id: uuidv4(),
            title: newTodo,
            completed: false,
            createdAt: new Date(),
        };
        setTodoList((prevTodos) => [...prevTodos, newTodoItem]);
    }

    const handleDeleteTodo = (index: string) => {
        setTodoList(prevTodos => prevTodos.filter(todo => todo.id !== index));
    }

    const handleToggleTodo = (id: string) => {
        setTodoList(prev =>
            prev.map(todo =>
                todo.id === id
                    ? {...todo, completed: !todo.completed}
                    : todo
            )
        );
    }

    const handleToggleAllTodos = () => {
        const areAllCompleted = todoList.every(todo => todo.completed);
        setTodoList(prev =>
            prev.map(todo => ({
                ...todo,
                completed: !areAllCompleted
            }))
        );
    }

    const handleClearCompletedTodos = () => {
        setTodoList( (prevTodos) => prevTodos.filter(todo => !todo.completed));
    }

    return (
        <>
            <TodoForm setTodos={handleAddTodoItem}/>
            <TodoList
                todoList={todoList}
                removeItem={handleDeleteTodo}
                handleToggleTodo={handleToggleTodo}
                handleSelectAll={handleToggleAllTodos}
                clearCompletedTodos={handleClearCompletedTodos}
                addMockData={handleAddMockData}
            />
        </>
    )
}
