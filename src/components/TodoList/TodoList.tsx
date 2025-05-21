import {Button} from "../../ui";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import type {TodoType} from "../../types/TodoType.ts";
import {useState, useEffect} from "react";
import {FilterStatus} from "../../types/FilterStatusEnum.ts";

type Props = {
    todoList: TodoType[];
    removeItem: (id: number) => void;
    handleToggleTodo: (id: number) => void;
    handleSelectAll: () => void;
}
export const TodoList = ({todoList, removeItem, handleToggleTodo, handleSelectAll}: Props) => {
    const areAllCompleted = todoList.every((todo) => todo.completed);
    const sortedTodos = [...todoList].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const [currentFilter, setCurrentFilter] = useState<FilterStatus>(FilterStatus.ALL);
    const [filteredTodos, setFilteredTodos] = useState(todoList);

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

    useEffect(() => {
        setFilteredTodos(filterMap[currentFilter](todoList));
    }, [todoList, currentFilter]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {todoList.length > 0 ? (
                <>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <Button
                            onClick={ handleSelectAll }
                            className="text-sm text-gray-600 hover:text-gray-900"
                            label={ areAllCompleted ? 'Unselect All' : 'Select All' }
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
                                onClick={ () => handleFilterActive(FilterStatus.ALL) }
                                className={`px-2 py-1 rounded ${currentFilter === FilterStatus.ALL ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            />
                            <Button
                                label="Active"
                                onClick={ () => handleFilterActive(FilterStatus.ACTIVE) }
                                className={`px-2 py-1 rounded ${currentFilter === FilterStatus.ACTIVE ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            />
                            <Button
                                label="Completed"
                                onClick={ () => handleFilterActive(FilterStatus.COMPLETED) }
                                className={`px-2 py-1 rounded ${currentFilter === FilterStatus.COMPLETED ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                            />
                            <Button
                                label="Clear Completed"
                                className="text-gray-500 hover:text-gray-700"
                            />
                        </div>

                    </div>
                </>
            ) :
                <div className="py-8 text-center text-gray-500">Add your first task!</div>
            }
        </div>
    )
}
