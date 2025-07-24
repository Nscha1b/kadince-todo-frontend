import { StickyNote } from "@/components/sticky-note";
import classNames from "classnames";
import { Tape } from "@/components/tape";
import { AuthForm } from "@/components/login/auth-form";
import { StickyNoteCard } from "@/components/sticky-note-card";
import { Button } from "@/components/buttons/button";
import { AddTodo } from "@/components/add-todo";
import { TodoCard } from "@/components/todo-card";

export default function Todos() {
    return (
        <div className="flex w-full flex-col">
            <h1 className="pt-10 text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground text-center">
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
