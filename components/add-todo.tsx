'use client';
import 'material-icons/iconfont/filled.css';
import { useState } from "react";
import { Button } from "./buttons/button";
import { TodoCard } from "./todo-card";

export function AddTodo() {
    const [creating, setCreating] = useState<boolean>(false);

    return (
        <>
            { !creating && (
                <Button className="max-w-xs justify-self-center align-self-center text-center" variant="primary" onClick={() => setCreating(true)}>Add Todo</Button>
            )}

            { creating && (
                <TodoCard
                    creating={creating}
                    setCreating={setCreating}
                    onSave={(todoData) => {
                        console.log("Saving todo:", todoData);
                        setCreating(false);
                    }}
                />
            )}
        </>
    );
}