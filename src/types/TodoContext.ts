import type {TodoType} from "./TodoType.ts";
import type {FilterStatus} from "./FilterStatusEnum.ts";

export interface TodoContext {
    todos: TodoType[];
    addTodo: (title: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearCompletedTodos: () => void;
    activeTodosCount: () => number;
    sortedTodos: () => TodoType[];
    areAllCompleted: () => boolean;
    toggleAllTodos: () => void;
    filter: FilterStatus;
    setFilter: (filter: FilterStatus) => void;
    filteredTodos: () => TodoType[];
    addMockData: () => void;
}
