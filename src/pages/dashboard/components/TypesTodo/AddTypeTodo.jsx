import React, { useState } from 'react';

import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import supabase from '../../../../client';
import { insertTypeTodo } from '../../../../store/slices/typesTodosSlice';

const AddTypeTodo = ({setAddTypeTodo}) => {

    const {user} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (formData) => {

        setLoading(true)

        const {data, error} = await supabase.from("types_todos")
                                .insert([
                                    { type: formData.type, profile_id: user.id }
                                ])

        if(!error){
            dispatch(insertTypeTodo({...data[0]}))
        }

        setLoading(false)
        setAddTypeTodo(false)                            
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-8">
                <input type="text" className="bg-transparent" {...register("type", {
                    required: true
                })} />

                {errors.type && <span className="text-red-400 block">El tipo de tarea es requerido.</span>}

                <div className="self-end flex mt-4">
                    <button className="btn-item mr-4 p-2" onClick={() => setAddTypeTodo(false)} type="button">Cancelar</button>
                    <button className="btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddTypeTodo;
