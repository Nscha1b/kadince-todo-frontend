'use client'
import { AddTodo } from "@/components/add-todo";
import { Todo, TodoCard } from "@/components/todo-card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTodos();
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
                <TodoCard
                    todo={{
                        id: "1",
                        title: "Sample Todo",
                        description: "This is a sample todo",
                        priority: "high",
                        completed: true,
                    }}
                />

                <TodoCard
                    todo={{
                        id: "2",
                        title: "Sample Todo",
                        description: "This is a sample todo",
                        priority: "low",
                        completed: true,
                    }}
                />

                <TodoCard
                    todo={{
                        id: "3",
                        title: "Sample Todo",
                        description: "This is a sample todo",
                        priority: "medium",
                        completed: true,
                    }}
                />
            </div>
        </div>
    );
}
