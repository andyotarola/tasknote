import { PlusSmIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import AddTodo from './components/todos/AddTodo';
import EmptyTodos from './components/todos/EmptyTodos';
import ListTodos from './components/todos/ListTodos';


const ButtonAddTodo = ({ setAddTodo }) => {
    return (
        <button className="btn-item p-3 flex mt-4" onClick={() => setAddTodo(true)}>
            <PlusSmIcon className="btn-icon"></PlusSmIcon>
            Añadir tarea
        </button>
    )
}

const Main = () => {

    const { loading, todos } = useSelector(state => state.todos)

    const [addTodo, setAddTodo] = useState(false)

    return (
        <>
            <div className="mx-auto">

                {
                    (() => {
                        if (todos.length > 0 && !loading) {
                            return <ListTodos />
                        } else if (todos.length <= 0 && !loading) {
                            return <EmptyTodos />
                        } else {
                            return <p className='mt-4'>Cargando...</p>
                        }
                    })()
                }

                {
                    addTodo
                        ? <AddTodo setAddTodo={setAddTodo} />
                        : <ButtonAddTodo setAddTodo={setAddTodo} />
                }

            </div>
        </>
    );
}

export default Main;
