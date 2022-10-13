import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import supabase from '@/client';
import { deleteTypeTodo } from '@/store/slices/typesTodosSlice';
import { setSelectedType } from '../../../../store/slices/filterTodoSlice';

const DataTypeTodo = ({item, setIsEditable}) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { selectedType } = useSelector(state => state.filter_todos)

    const dispatch = useDispatch() 


    const handleClick = async () => {
        const isConfirm = confirm("¿Estás seguro de que quiere eliminar este tipo de tarea?")

        if(isConfirm){
            setError(false)
            setLoading(true)

            if(selectedType === item.id){
                dispatch(setSelectedType(-1))
            }

            const  { error } = await supabase.from("types_todos")
                                    .delete()
                                    .match({id: item.id})
            if (!error)  dispatch(deleteTypeTodo(item.id))
            else setError(true)
            
            setLoading(false)

        }
    }

    return (
        <>
            <div className="flex justify-between mt-8 mb-2">
                <span className="text-ellipsis overflow-x-hidden whitespace-nowrap">{item.type}</span>
                <div className="flex">
                    <button className="btn-icon mr-2" onClick={()=> setIsEditable(true)}>
                        <PencilIcon />
                    </button>
                    <button className="btn-icon" onClick={handleClick} disabled={loading}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
            {error && <span className="text-red-400 block text-xs">No se pudo eliminar el tipo de tarea, ya que otras dependen de ella.</span>}
            
            <div className="separator my-4"></div>
        </>
    );

}

export default DataTypeTodo