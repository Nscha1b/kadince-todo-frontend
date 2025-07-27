'use client'
import { AddTodo } from "@/components/add-todo";
import { useCallback, useEffect, useState } from "react";
import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse } from "axios";
import { useToast } from "@/contexts/toast-context";
import { Todo, TodoFormData } from "@/types/todos";
import { TodoCard } from "@/components/todo-card";
import { FilterTodos } from "@/components/filter-todos";
import { useSearchParams } from "next/navigation";
import { Logout } from "@/components/login/logout";
import { PrintReport } from "@/components/print-report";

export default function Todos() {
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    const [todos, setTodos] = useState<Todo[]>([]);

    const completedParam = searchParams?.get('completed');
    const setFilter = () => {
        switch (completedParam) {
            case 'true': return 'Completed';
            case 'false': return 'To do';
            default: return 'All';
        }
    }
    const filter = setFilter();

    const fetchTodos = useCallback(() => {
        const query = searchParams?.size ? `?${searchParams.toString()}` : '';
        rubyApiClient.get(`/todos${query}`)
            .then((todoArray: AxiosResponse<Todo[]>) => setTodos(todoArray.data))
            .catch(() => addToast("Failed to load todos", "error"));
    }, [searchParams, addToast, setTodos]);

    const updateTodo = (todo: Todo) => {
        rubyApiClient.patch(`/todos/${todo.id}`, todo)
            .then(() => {
                fetchTodos();
                addToast("Todo updated successfully!", "success");
            })
            .catch(err => {
                console.error("Failed to update todo:", err);
                addToast("Failed to updated todo", "error");
            });
    }

    const editTodo = (todoData: TodoFormData, todo: Todo) => {
        todo.title = todoData.title.trim();
        todo.description = todoData.description;
        todo.priority = todoData.priority;
        updateTodo(todo);
    }

    const completeTodo = (todo: Todo) => {
        todo.completed = !todo.completed;
        updateTodo(todo);
    }

    const deleteTodo = (todo: Todo) => {
        rubyApiClient.delete(`/todos/${todo.id}`)
            .then(() => {
                fetchTodos();
                addToast("Todo Deleted successfully!", "success");
            })
            .catch(err => {
                console.error("Failed to delete todo:", err);
                addToast("Failed to delete todo", "error");
            });
    }

    useEffect(() => {
        fetchTodos();
    }, [searchParams, fetchTodos]);

    return (
        <div className="flex w-full flex-col">
            <Logout />
            <h1 className="pt-6 text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground text-center">
                Todo&apos;s
            </h1>

            <div className="flex justify-between items-center mt-4 px-2 lg:px-8">
                <FilterTodos
                    filter={filter}
                />
                <PrintReport />
            </div>

            <div className="flex justify-center items-center mt-4 px-2 lg:px-8">
                <AddTodo onSave={fetchTodos} />
            </div>

            <div className="flex flex-col justify-center items-center mt-4 px-2 lg:px-8">
                {todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onDelete={
                            (todo) => deleteTodo(todo)
                        }
                        onToggleComplete={
                            (todo) => completeTodo(todo)
                        }
                        onSave={
                            (formdata) => editTodo(formdata, todo)
                        }
                    />
                ))}
            </div>
        </div>
    );
}
