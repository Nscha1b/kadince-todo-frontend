type Todo = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
    created_at?: Date;
    updated_at?: Date;
    user_id: number;
}

type TodoFormData = {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
}
export type { Todo, TodoFormData };
