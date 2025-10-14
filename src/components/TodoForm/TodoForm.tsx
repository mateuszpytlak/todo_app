import {type FormEventHandler, useState} from "react";
import * as React from "react";
import {Button} from "../../ui";
import {useTodosContext} from "../TodosContext/TodosContext.tsx";

export const TodoForm = () => {
    const { addTodo } = useTodosContext();

    const [title, setTitle] = useState<string>('');

    const handleAddTodo: FormEventHandler = ( event: React.FormEvent ) => {
        event.preventDefault();
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    }

    return (
        <form className="my-6" onSubmit={handleAddTodo}>
            <div className="flex items-center border border-gray-300 rounded oberflow-hidden shadow-sm">
                <input
                    type="text"
                    className="flex-grow px-4 py-3 focus:outline-none"
                    placeholder="Type a task todo"
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                    // todo prevent refresh on every key stroke (useRef?)
                />
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 transition-colors"
                    label="Add"
                />
            </div>
        </form>
    )
}
