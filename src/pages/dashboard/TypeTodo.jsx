import { PlusSmIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

import { useSelector } from 'react-redux'
import AddTypeTodo from './components/TypesTodo/AddTypeTodo';
import EmptyTypesTodos from './components/TypesTodo/EmptyTypesTodos';
import ListTypesTodos from './components/TypesTodo/ListTypesTodos';

const ButtonAddTypeTodo = ({setAddTypeTodo}) => {
    return(
        <button className="btn-item p-3 flex"  onClick={()=> setAddTypeTodo(true)}>
            <PlusSmIcon className="btn-icon" />
            Añadir tipo tarea
        </button>
    )
}


const TypeTodo = () => {

    const {types_todos, loading} = useSelector(state => state.types_todos)
    const [addTypeTodo, setAddTypeTodo] = useState(false)

    return (
        <>
            <h1 className="text-black dark:text-white font-extrabold text-lg mt-4">Tipos tareas</h1>

            {
                (()=> {
                    if(types_todos.length > 0 && !loading){
                        return <ListTypesTodos />
                    }else if(types_todos.length <= 0 && !loading){
                        return <EmptyTypesTodos />
                    }else {
                        return <p className='mt-4'>Cargando...</p>
                    }
                })()
            }

            
            { 
                addTypeTodo
                ?<AddTypeTodo setAddTypeTodo={setAddTypeTodo} />
                :<ButtonAddTypeTodo setAddTypeTodo={setAddTypeTodo}/> 
            }
            
        </>
    );
}

export default TypeTodo;
