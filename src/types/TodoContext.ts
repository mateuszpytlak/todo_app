import type {TodoType} from "./TodoType.ts";
import type {FilterStatus} from "./FilterStatusEnum.ts";

export interface TodoContext {
    todoList: TodoType[];
    addTodoItem: (title: string) => void;
    deleteTodoItem: (id: string) => void;
    toggleTodoCompletion: (id: string) => void;
    clearCompletedTodos: () => void;
    filter: FilterStatus;
    setFilter: (filter: FilterStatus) => void;
}
