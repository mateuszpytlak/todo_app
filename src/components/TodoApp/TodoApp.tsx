import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import {useTodos} from "../../hooks/useTodos.ts";
export const TodoApp = () => {
    const {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompletedTodos,
        activeTodosCount,
        sortedTodos,
        areAllCompleted,
        toggleAllTodos,
        filter,
        setFilter,
        filteredTodos,
        addMockData,
    } = useTodos();

    return (
        <>
            <TodoForm addTodo={addTodo} />
            <TodoList
                todoList={todos}
                toggleTodo={toggleTodo}
                removeItem={removeTodo}
                clearCompletedTodos={clearCompletedTodos}
                activeTodosCount={activeTodosCount}
                sortedTodos={sortedTodos}
                areAllCompleted={areAllCompleted}
                toggleAllTodos={toggleAllTodos}
                filter={filter}
                setFilter={setFilter}
                filteredTodos={filteredTodos}
                addMockData={addMockData}
            />
        </>
    )
}
