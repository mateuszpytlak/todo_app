import {Button} from "../../ui";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import type {TodoType} from "../../types/TodoType.ts";
import {useState, useEffect} from "react";
import {FilterStatus} from "../../types/FilterStatusEnum.ts";
import {Popup} from "../../ui/Popup";

type Props = {
    todoList: TodoType[];
    removeItem: (id: number) => void;
    handleToggleTodo: (id: number) => void;
    handleSelectAll: () => void;
    clearCompletedTodos: () => void;
}
export const TodoList = ({todoList, removeItem, handleToggleTodo, handleSelectAll, clearCompletedTodos}: Props) => {
    const areAllCompleted = todoList.every((todo) => todo.completed);
    const sortedTodos = [...todoList].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const [currentFilter, setCurrentFilter] = useState<FilterStatus>(FilterStatus.ALL);
    const [filteredTodos, setFilteredTodos] = useState(todoList);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showNoCompletedTasks, setShowNoCompletedTasks] = useState(false);

    const filterMap = {
        [FilterStatus.ACTIVE]: (todos: TodoType[]) => todos.filter(todo => !todo.completed),
        [FilterStatus.COMPLETED]: (todos: TodoType[]) => todos.filter(todo => todo.completed),
        [FilterStatus.ALL]: (todos: TodoType[]) => todos,
    };

    const handleFilterActive = (filterType: FilterStatus) => {
        setCurrentFilter(filterType);
        setFilteredTodos(filterMap[filterType](todoList));
    };

    const computeUnfinishedTasks = todoList.filter(todo => !todo.completed).length;

    const handleClearCompletedClick = () => {
        const hasCompletedTasks = todoList.some(todo => todo.completed);
        if (hasCompletedTasks) {
            setShowClearConfirm(true);
        } else {
            setShowNoCompletedTasks(true);
        }
    };

    useEffect(() => {
        setFilteredTodos(filterMap[currentFilter](todoList));
    }, [todoList, currentFilter]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {todoList.length > 0 ? (
                    <>
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                            <Button
                                onClick={handleSelectAll}
                                className="text-sm text-gray-600 hover:text-gray-900"
                                label={areAllCompleted ? 'Unselect All' : 'Select All'}
                            />
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {(currentFilter === FilterStatus.ALL ? sortedTodos : filteredTodos).map((element: TodoType) => {
                                return <TodoItem
                                    key={element.id}
                                    listItem={element}
                                    deleteItem={removeItem}
                                    toggleTodo={handleToggleTodo}
                                />;
                            })}
                        </ul>
                        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between text-sm">
                            <span>{computeUnfinishedTasks} {todoList.filter(todo => !todo.completed).length >= 2 ? 'tasks' : 'task'} left</span>
                            <div className="flex space-x-2">
                                <Button
                                    label="All"
                                    className={`px-2 py-1 rounded ${currentFilter === FilterStatus.ALL ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                    onClick={() => handleFilterActive(FilterStatus.ALL)}
                                />
                                <Button
                                    label="Active"
                                    className={`px-2 py-1 rounded ${currentFilter === FilterStatus.ACTIVE ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                    onClick={() => handleFilterActive(FilterStatus.ACTIVE)}
                                />
                                <Button
                                    label="Completed"
                                    className={`px-2 py-1 rounded ${currentFilter === FilterStatus.COMPLETED ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                    onClick={() => handleFilterActive(FilterStatus.COMPLETED)}
                                />
                                <Button
                                    label="Clear Completed"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={handleClearCompletedClick}
                                />
                            </div>
                            <Popup
                                title="Are you sure you want to clear all completed todos?"
                                onClose={() => setShowClearConfirm(false)}
                                isOpen={showClearConfirm}
                            >
                                <Button
                                    label="Cancel"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                    onClick={() => setShowClearConfirm(false)}
                                />
                                <Button
                                    label="Clear"
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => {
                                        clearCompletedTodos();
                                        setShowClearConfirm(false);
                                    }}
                                />
                            </Popup>
                            <Popup
                                title="No completed tasks to clear"
                                onClose={() => setShowNoCompletedTasks(false)}
                                isOpen={showNoCompletedTasks}
                            >
                                <Button
                                    label="OK"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => setShowNoCompletedTasks(false)}
                                />
                            </Popup>
                        </div>
                    </>
                ) :
                <div className="py-8 text-center text-gray-500">Add your first task!</div>
            }
        </div>
    )
}
