import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import useFilterTodo from '@/hooks/useFilterTodo';
import FilterTodo from './FilterTodo';
import SearchTodo from './SearchTodo';
import TodoItem from './TodoItem';

const ListTodos = () => {

    const [search, setSearch] = useState('')
    
    const { done, all, selectedType} = useSelector(state => state.filter_todos)

    const { filteredTodos } = useFilterTodo(search, selectedType, done, all)

    return (
        <>
            <SearchTodo setSearch={setSearch} search={search}/>

            <FilterTodo />

            <div className="mt-4">
                <ul>
                    {
                        filteredTodos.map((item) => {
                            return <TodoItem key={item.id} item={item} />
                        })
                    }
                </ul>
            </div>

        </>
    );
}

export default ListTodos;
