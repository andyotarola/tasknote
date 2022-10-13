import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import supabase from '@/client';
import { updateTypesTodos } from '@/store/slices/typesTodosSlice';

const EditableTypeTodo = ({item, setIsEditable}) => {
    

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch() 
    
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        type: item.type
    }})

    const onSubmit = async (formData) => {
        
        setLoading(true)

        const {data, error} = await supabase.from("types_todos")
                                .update({type: formData.type ,updated_at: new Date().toISOString()})
                                .eq('id', item.id)
        

        if(data.length > 0){
            dispatch(updateTypesTodos({...data[0]}))
        }
        setLoading(false)
        setIsEditable(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-8">
                    <input type="text" className="bg-transparent" {...register("type", {
                        required:true
                    })}/>
                    
                    {errors.type && <span className="text-red-400 block">El tipo de tarea es requerido.</span>} 

                    <div className="self-end flex mt-4">
                        <button className="btn-item mr-4 p-2" onClick={()=> setIsEditable(false)} type="button">Cancelar</button>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading?'Cargando...':'Guardar'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )

}

export default EditableTypeTodo;