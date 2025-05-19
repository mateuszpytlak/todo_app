import {Button} from "../../ui";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import type {TodoType} from "../../types/TodoType.ts";

type Props = {
    todoList: TodoType[];
    removeItem: (id: number) => void;
    handleToggleTodo: (id: number) => void;
}
export const TodoList = ({todoList, removeItem, handleToggleTodo}: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {todoList.length > 0 ? (
                <>
                    <ul className="divide-y divide-gray-200">
                        {todoList.map((element: TodoType) => {
                            return <TodoItem
                                key={element.id}
                                listItem={element}
                                deleteItem={removeItem}
                                toggleTodo={handleToggleTodo}
                            />;
                        })}
                    </ul>
                    <div className="px-4 py-3 bg-gray-50 flex items-center justify-between text-sm">
                        <span>{todoList.length} {todoList.length >= 2 ? 'tasks' : 'task'} left</span>
                        <div className="flex space-x-2">
                            <Button label="All"/>
                            <Button label="Active"/>
                            <Button label="Completed"/>
                            <Button label="Clear Completed"/>
                        </div>

                    </div>
                </>
            ) :
                <div className="py-8 text-center text-gray-500">Add your first task!</div>
            }
        </div>
    )
}
