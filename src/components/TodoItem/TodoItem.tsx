import {type ChangeEventHandler, type HTMLProps, useState} from "react";
import {Button} from "../../ui";
import type {TodoType} from "../../types/TodoType.ts";

type Props = {
    listItem: TodoType;
    deleteItem: (id: number) => void;
    toggleTodo: (id: number) => void;
} & HTMLProps<HTMLLIElement>;

export const TodoItem = ({listItem, deleteItem, toggleTodo}: Props) => {
    const [completed, setCompleted] = useState(listItem.completed);
    const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
        toggleTodo( listItem.id);
        setCompleted(!completed);
    };

    const handleDeleteTodo = () => {
        deleteItem(listItem.id);
    }

    const deleteIconSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        </svg>
    );

    return (
        <li className="flex items-center justify-between py-3 px-4 border-b last:border-0 group hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={completed}
                    className="w-5 h-5 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={handleChange}
                />
                <div>
                    <p>
                        {listItem.title}
                    </p>
                    {/*//todo wprowadzic date createdAt*/}
                    <span className="text-xs text-gray-500">
                        date
                    </span>
                </div>
            </div>
            <div >
                <Button
                    label={deleteIconSvg}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={ handleDeleteTodo }
                />
            </div>
        </li>
    );
}
