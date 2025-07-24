'use client';
import { StickyNote } from "./sticky-note";
import 'material-icons/iconfont/filled.css';
import { IconButton } from "./buttons/icon-button";
import { useState } from "react";
import { Button } from "./buttons/button";
import { Tooltip } from "./tooltip/tooltip";
import { Input } from "./inputs/input";
import { Tape } from "./tape";
import { twMerge } from "tailwind-merge";

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
}

export interface TodoFormData {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
}


export function TodoCard({
    todo,
    creating = false,
    setCreating,
    onSave,
    onDelete,
    onToggleComplete,
    children,
}: {
    todo?: Todo;
    creating?: boolean;
    setCreating?: (creating: boolean) => void;
    onSave?: (todoData: TodoFormData) => void;
    onDelete?: (todoId: string) => void;
    onToggleComplete?: (todoId: string) => void;
    children?: React.ReactNode;
}) {
    const [editing, setEditing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const [formData, setFormData] = useState<TodoFormData>({
        title: todo?.title || '',
        description: todo?.description || '',
        priority: todo?.priority || 'low',
    });

    const handleDelete = () => {
        if (todo && onDelete) {
            onDelete(todo.id);
        }
        setDeleting(false);
    };

    const handleSave = () => {
        if (onSave && formData.title.trim()) {
            onSave(formData);
            if (creating) {
                // Reset form for creating new todos
                setFormData({
                    title: '',
                    description: '',
                    priority: 'medium',
                });
            } else {
                setEditing(false);
            }
        }
    };

    const handleToggleComplete = () => {
        if (todo && onToggleComplete) {
            todo.completed = true;
            onToggleComplete(todo.id);
        }
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high': return 'bg-accent/50';
            case 'medium': return 'bg-secondary/50';
            case 'low': return 'bg-muted-light/30';
        }
    };

    return (
        <>
            {!creating && todo && (
                <div className="w-full mb-4">
                    <StickyNote color="surface" className="!aspect-auto w-full !text-foreground pt-4 pb-1">
                        <div className="flex justify-between items-start h-[44px]">
                            <div className="flex items-center space-x-2">
                                <span className={`text-lg`}>
                                    {!todo.completed && (
                                        <Tape className={twMerge(
                                            "w-[7rem] h-[25px] absolute top-0 left-[-25px] rotate-[-15deg]",
                                            getPriorityColor(todo.priority)
                                        )} />
                                    )}
                                    {todo.completed && (
                                        <Tape className={twMerge(
                                            "w-[7rem] h-[25px] absolute top-0 left-[-25px] rotate-[-15deg]",
                                            'bg-primary/50'
                                        )} />
                                    )}

                                </span>

                            </div>

                            <div className="flex">
                                {!editing && !deleting && (
                                    <>
                                        {todo.completed ? (
                                            <Tooltip content="Mark as Incomplete">
                                                <IconButton iconClasses="!text-2xl text-primary" iconName="check_box" onClick={handleToggleComplete} />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip content="Mark as Complete">
                                                <IconButton iconClasses="!text-2xl" iconName="check_box_outline_blank" onClick={handleToggleComplete} />
                                            </Tooltip>
                                        )}
                                        <span className="mx-1"></span>
                                        <Tooltip content="Delete Todo">
                                            <IconButton iconClasses="!text-2xl" iconName="delete" onClick={() => setDeleting(true)} />
                                        </Tooltip>
                                        <span className="mx-1"></span>
                                        <Tooltip content="Edit Todo">
                                            <IconButton iconClasses="!text-2xl" iconName="edit" onClick={() => setEditing(true)} />
                                        </Tooltip>
                                    </>
                                )}
                            </div>
                        </div>
                    </StickyNote>

                    <StickyNote color="surface" className="!aspect-auto w-full !text-foreground p-1 md:p-6">
                        {!editing && (
                            <div>
                                <h3 className={`font-handwriting text-4xl lg:text-5xl relative`}>
                                    {todo.title}
                                </h3>
                                {todo.description && (
                                    <p className="font-handwriting text-2xl lg:text-3xl mt-2 text-gray-600">
                                        {todo.description}
                                    </p>
                                )}
                            </div>
                        )}

                        {deleting && (
                            <div className="mt-4 flex justify-end flex-col items-end">
                                <p className="font-semibold text-accent-dark block">Are you sure you want to delete this todo?</p>
                                <div className="mt-2 block">
                                    <Button className="mr-2" variant="secondary" onClick={() => setDeleting(false)}>Cancel</Button>
                                    <Button variant="primary" onClick={handleDelete}>Delete</Button>
                                </div>
                            </div>
                        )}

                        {editing && (
                            <div className="mt-4 space-y-4">
                                <Input
                                    label={{ text: 'Title', hideLabel: false }}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Todo title..."
                                    className="font-handwriting text-2xl"
                                    variant="surface"
                                />
                                <textarea
                                    className="w-full h-32 p-2 border border-muted-light rounded-lg font-handwriting text-xl lg:text-2xl"
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Description (optional)..."
                                />
                                <select
                                    className="w-full p-2 border border-muted-light rounded-lg"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                                <div className="flex justify-end">
                                    <Button className="mr-2" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                                    <Button variant="primary" onClick={handleSave}>Save</Button>
                                </div>
                            </div>
                        )}
                    </StickyNote>
                </div>
            )}

            {creating && setCreating && (
                <StickyNote color="surface" wrapperClassName="w-full" className="!aspect-auto w-full !text-foreground p-1 md:p-6">
                    <div className="space-y-4">
                        <h4 className="font-handwriting text-3xl">Create New Todo</h4>
                        <Input
                            label={{ text: 'Title', hideLabel: false }}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Todo title..."
                            className="font-handwriting text-2xl"
                            variant="surface"
                        />
                        <textarea
                            className="w-full h-32 p-2 border border-muted-light rounded-lg font-handwriting text-xl lg:text-2xl"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description (optional)..."
                        />
                        <select
                            className="w-full p-2 border border-muted-light rounded-lg"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <div className="flex justify-end">
                            <Button className="mr-2" variant="secondary" onClick={() => setCreating(false)}>Cancel</Button>
                            <Button variant="primary" onClick={handleSave}>Create Todo</Button>
                        </div>
                    </div>
                </StickyNote>
            )}
        </>
    );
}