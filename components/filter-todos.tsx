'use client';
import 'material-icons/iconfont/filled.css';
import { Button } from "./buttons/button";
import { PopupMenu, PopupMenuItem } from './popup-menu/popup-menu';
import { useRouter } from 'next/navigation';

interface AddTodoProps {
    filter: string,
}

export function FilterTodos({ filter }: AddTodoProps) {
    const router = useRouter();
    const handler = (item: PopupMenuItem) => changeFilter(item);
    const changeFilter = (item: PopupMenuItem) => {
        const params = new URLSearchParams();

        if (item.value !== 'all') {
            params.set('completed', item.value);
        }

        router.push(`/todos?${params.toString()}`)
    }

    const all = {
        id: 'all-items',
        label: 'All',
        value: 'all',
        onClick: handler
    };
    const completed = {
        id: 'completed-items',
        label: 'Completed',
        value: 'true',
        onClick: handler
    };
    const todo = {
        id: 'todo-items',
        label: 'To do',
        value: 'false',
        onClick: handler
    }

    const menuItems: PopupMenuItem[] = [all, completed, todo];
    return (
        <>
            <div className='flex items-center'>
                Filter:
                <PopupMenu
                    trigger={
                        <Button variant="plain">{filter}</Button>
                    }
                    items={menuItems}
                />
            </div>
        </>)
}
