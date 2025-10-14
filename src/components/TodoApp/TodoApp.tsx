import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import {TodosContextProvider} from "../TodosContext/TodosContext.tsx";

export const TodoApp = () => {
    return (
        <>
            <TodosContextProvider>
                <TodoForm />
                <TodoList />
            </TodosContextProvider>
        </>
    )
}
