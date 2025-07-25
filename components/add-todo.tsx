'use client';
import 'material-icons/iconfont/filled.css';
import { useState } from "react";
import { Button } from "./buttons/button";
import { TodoCard } from "./todo-card";
import rubyApiClient from '@/lib/rubyApiClient';
import Cookies from 'js-cookie';
import { useToast } from '@/contexts/toast-context';

interface AddTodoProps {
    onSave: () => void;
}

export function AddTodo({ onSave }: AddTodoProps) {
    const { addToast } = useToast();
    const [creating, setCreating] = useState<boolean>(false);

    return (
        <>
            {!creating && (
                <Button className="max-w-xs justify-self-center align-self-center text-center" variant="primary" onClick={() => setCreating(true)}>Add Todo</Button>
            )}

            {creating && (
                <TodoCard
                    creating={creating}
                    setCreating={setCreating}
                    onSave={(todoData) => {
                        const todo = { ...todoData, user_id: Cookies.get('user_id') };
                        rubyApiClient.post('/todos', todo)
                            .then(() => {
                                onSave();
                                addToast("Todo created successfully!", "success");
                                setCreating(false);
                            })
                            .catch(err => {
                                console.error("Failed to save todo:", err);
                                addToast("Failed to create todo", "error");
                            });
                    }}
                />
            )}
        </>
    );
}