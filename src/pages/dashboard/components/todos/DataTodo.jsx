import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import supabase from '../../../../client';
import { deleteTodo, setDone } from '../../../../store/slices/todoSlice';

const DataTodo = ({item, setIsEditable}) => {

    const [loading, setLoading] = useState(false)
    const dispatch  = useDispatch()

    const handleClick = async () => {
        const isConfirm = confirm("¿Estás seguro de que quiere eliminar está tarea?")
        if(isConfirm){

            setLoading(true)

            const  { error } = await supabase.from("todos")
                                    .delete()
                                    .match({id: item.id})
            if(!error) {
                dispatch(deleteTodo(item.id))
            }

            setLoading(false)

        }
        
    }

    const onDone = async () => {

        const {data, error} = await supabase.from("todos")
                                        .update({done: !item.done, updated_at: new Date().toISOString()})
                                        .match({id: item.id})

        if(!error) dispatch(setDone({...data[0]}))

    }

    return (
        <>
            <div className="flex justify-between mt-8 mb-8">
                <div className="flex cursor-pointer select-none" onClick={onDone}> 
                    <button>
                        <div className="rounded-full border border-current w-5 h-5 flex justify-center items-center">
                            <CheckIcon 
                                className={`h-3 w-3 transition-opacity ${item.done?'opacity-100':'opacity-0'}`} 
                            />
                        </div>
                    </button>
                    <span className={`text-ellipsis overflow-x-hidden whitespace-nowrap ml-2 ${item.done?'line-through':''}`}>{item.name}</span>
                </div>
                <div className="flex">
                    <button className="btn-icon mr-2" onClick={()=> setIsEditable(true)}>
                        <PencilIcon />
                    </button>
                    <button className="btn-icon" onClick={handleClick} disabled={loading}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
            <div className="separator"></div>
        </>
    );
}

export default DataTodo;
