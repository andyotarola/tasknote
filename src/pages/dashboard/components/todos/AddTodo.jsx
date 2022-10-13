import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import supabase from '../../../../client';
import { setSelectedType } from '../../../../store/slices/filterTodoSlice';
import { insertTodo } from '../../../../store/slices/todoSlice';

const AddTodo = ({ setAddTodo }) => {

    const { user } = useSelector(state => state.user)
    const { types_todos } = useSelector(state => state.types_todos)
    const { selectedType } = useSelector(state => state.filter_todos)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue} = useForm()

    useEffect(() => {
        setValue("type", selectedType)
    }, [selectedType]);

    const [loading, setLoading] = useState(false)

    const onSubmit = async (formData) => {

        setLoading(true)

        const { data, error } = await supabase.from("todos")
            .insert([
                { 
                    name: formData.name, 
                    profile_id: user.id,
                    type_todo_id: formData.type=='-1' ? null: formData.type
                }
            ])

        if (!error) dispatch(insertTodo({ ...data[0]}))
        
        setLoading(false)
        setAddTodo(false)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
                <input type="text" className="bg-transparent w-full" {...register("name", {
                    required: true
                })} />

                {errors.name && <span className="text-red-400 block">El nombre de la tarea es requerida.</span>}

                <select className='bg-transparent mt-2 text-xs disabled:opacity-40'
                    {...register("type")}
                    onChange={(e) => dispatch(setSelectedType(e.target.value))}
                >
                    <option value="-1">Por defecto</option>
                    {
                        types_todos.map((el) => {
                            return <option key={el.id} value={el.id}>{el.type}</option>
                        })
                    }
                </select>

                <div className="flex mt-4 justify-end">
                    <button className="btn-item mr-4 p-2" onClick={() => setAddTodo(false)} type="button">Cancelar</button>
                    <button className="btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddTodo;
