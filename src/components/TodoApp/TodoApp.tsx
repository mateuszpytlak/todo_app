import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import type {TodoType} from "../../types/TodoType.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";

export const TodoApp = () => {
    // const todosMock = [
    //     {
    //         id: 1,
    //         title: 'clean the house',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 2,
    //         title: 'got to the store',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 3,
    //         title: 'walk the dog',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 4,
    //         title: 'go to the gym',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 5,
    //         title: 'read a book',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 6,
    //         title: 'write some code',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    //
    // ];

    const [todoList, setTodoList] = useLocalStorage<TodoType[]>('todos', []);

    //todo: add button to quickly add mock data

    const handleAddTodoItem = (newTodo: string) => {
        const newTodoItem: TodoType = {
            id: todoList.length + 1,
            title: newTodo,
            completed: false,
            createdAt: new Date(),
        };
        setTodoList((prevTodos) => [...prevTodos, newTodoItem]);
    }

    const handleDeleteTodo = (index: number) => {
        setTodoList(prevTodos => prevTodos.filter(todo => todo.id !== index));
    }

    const handleToggleTodo = (id: number) => {
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
            />
        </>
    )
}
