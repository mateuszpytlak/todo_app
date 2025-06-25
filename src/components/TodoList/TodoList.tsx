import {Button} from "../../ui";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import type {TodoType} from "../../types/TodoType.ts";
import {useState} from "react";
import {FilterStatus} from "../../types/FilterStatusEnum.ts";
import {Popup} from "../../ui/Popup";
import {TooltipIcon} from "../../ui/TooltipIcon";

type Props = {
    todoList: TodoType[];
    removeItem: (id: string) => void;
    toggleTodo: (id: string) => void;
    toggleAllTodos: () => void;
    clearCompletedTodos: () => void;
    filteredTodos: () => TodoType[];
    filter: FilterStatus;
    setFilter: (filter: FilterStatus) => void;
    sortedTodos: () => TodoType[];
    areAllCompleted: () => boolean;
    activeTodosCount: () => number;
    addMockData: () => void;
}
export const TodoList = ({
                             todoList,
                             removeItem,
                             toggleTodo,
                             toggleAllTodos,
                             clearCompletedTodos,
                             setFilter,
                             filter,
                             sortedTodos,
                             areAllCompleted,
                             activeTodosCount,
                             addMockData,
                         }: Props) => {

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showNoCompletedTasks, setShowNoCompletedTasks] = useState(false);

    const handleClearCompletedClick = () => {
        const hasCompletedTasks = todoList.some(todo => todo.completed);
        if (hasCompletedTasks) {
            setShowClearConfirm(true);
        } else {
            setShowNoCompletedTasks(true);
        }
    };

    return (
        <>
            <div className="py-2 flex justify-end">
                <Button
                    onClick={addMockData}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    label={
                        <>
                            Load Mock Data
                            <TooltipIcon className="w-4 h-4"/>
                        </>
                    }
                />
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {todoList.length > 0 ? (
                        <>
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex justify-between">
                                <Button
                                    onClick={toggleAllTodos}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                    label={areAllCompleted() ? 'Unselect All' : 'Select All'}
                                />
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {sortedTodos().map((element: TodoType) => {
                                    return <TodoItem
                                        key={element.id}
                                        listItem={element}
                                        removeTodo={removeItem}
                                        toggleTodo={toggleTodo}
                                    />
                                })}
                            </ul>
                            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between text-sm">
                                <span>{activeTodosCount()} {activeTodosCount() >= 2 ? 'tasks' : 'task'} left</span>
                                <div className="flex space-x-2">
                                    <Button
                                        label="All"
                                        className={`px-2 py-1 rounded ${filter === FilterStatus.ALL ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onClick={() => setFilter(FilterStatus.ALL)}
                                    />
                                    <Button
                                        label="Active"
                                        className={`px-2 py-1 rounded ${filter === FilterStatus.ACTIVE ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onClick={() => setFilter(FilterStatus.ACTIVE)}
                                    />
                                    <Button
                                        label="Completed"
                                        className={`px-2 py-1 rounded ${filter === FilterStatus.COMPLETED ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onClick={() => setFilter(FilterStatus.COMPLETED)}
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
        </>
    )
}
