import {createContext, type ReactNode, useContext} from "react";
import type {TodoContext} from "../../types/TodoContext.ts";
import {useTodos} from "../../hooks/useTodos.ts";

export const TodosContext = createContext<TodoContext | null>(null);
TodosContext.displayName = "TodosContext";

export const useTodosContext = () => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error('useTodosContext must be used within a TodosContextProvider');
    }
    return context;
}

export const TodosContextProvider = ({ children }: { children: ReactNode }) => {
    const contextValue = useTodos();

    return (
        <TodosContext.Provider value={contextValue}>
            {children}
        </TodosContext.Provider>
    )
}
