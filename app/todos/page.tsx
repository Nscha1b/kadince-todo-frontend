'use client'
import { AddTodo } from "@/components/add-todo";
import { useEffect, useState } from "react";
import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse } from "axios";
import { useToast } from "@/contexts/toast-context";
import { Todo } from "@/types/todos";
import { TodoCard } from "@/components/todo-card";

export default function Todos() {
    const { addToast } = useToast();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rubyApiClient.get('/todos')
      .then((todoArray: AxiosResponse<Todo[]>) => {
        setTodos(todoArray.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        addToast("Failed to load todos. Please try again.", "error");
      })
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full flex-col">
            <h1 className="pt-6 text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground text-center">
                Todo's
            </h1>

            <div className="flex justify-center items-center mt-4 px-2 lg:px-8">
                <AddTodo />
            </div>

            <div className="flex flex-col justify-center items-center mt-4 px-2 lg:px-8">
                {todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
