import { type HTMLProps, useState, type MouseEvent} from "react";
import {Button} from "../../ui";
import type {TodoType} from "../../types/TodoType.ts";
import {Popup} from "../../ui/Popup";

type Props = {
    listItem: TodoType;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
} & HTMLProps<HTMLLIElement>;

export const TodoItem = ({listItem, removeTodo, toggleTodo}: Props) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeleteTodo = (e: MouseEvent) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    }

    const confirmDelete = () => {
        removeTodo(listItem.id);
        setShowDeleteConfirm(false);
    }

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
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

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(date));
    }

    return (
        <li className={`
            flex items-center justify-between p-4 hover:bg-gray-50 transition-colors
            ${listItem.completed ? 'opacity-60 text-gray-500' : ''}
        `}>
            <div className="flex items-center gap-x-3">
                <input
                    type="checkbox"
                    checked={listItem.completed}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    onChange={() => toggleTodo(listItem.id)}
                />
                <div>
                    <p>
                        {listItem.title}
                    </p>
                    <span className="text-xs text-gray-500">
                        {formatDate(listItem.createdAt)}
                    </span>
                </div>
            </div>
            <Button
                label={deleteIconSvg}
                className="text-gray-400 hover:text-red-500 opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleDeleteTodo}
            />
            <Popup
                title="Are you sure you want to delete this todo?"
                onClose={cancelDelete}
                isOpen={showDeleteConfirm}
            >
                <Button
                    label="Cancel"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={cancelDelete}
                />
                <Button
                    label="Delete"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={confirmDelete}
                />
            </Popup>
        </li>
    );
}
