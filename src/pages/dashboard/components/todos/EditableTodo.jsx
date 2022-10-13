import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import supabase from '../../../../client';
import { updateTodo } from '../../../../store/slices/todoSlice';

const EditableTodo = ({ item, setIsEditable }) => {
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState(item.type_todo_id || -1)

    const {types_todos} = useSelector(state => state.types_todos)

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: item.name
        }
    })

    const onSubmit = async (formData) => {
        setLoading(true)

        const { data, error } = await supabase.from("todos")
            .update({
                name: formData.name,
                updated_at: new Date().toISOString(),
                type_todo_id: type=='-1' ? null: type
            })
            .eq("id", item.id)

        if(!error) dispatch(updateTodo({...data[0]}))

        setLoading(false)
        setIsEditable(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8 border border-slate-700 p-4">
                    <input type="text" className="bg-transparent block w-full" {...register("name", {
                        required: true
                    })} />

                    {errors.name && <span className="text-red-400 block">El tipo de tarea es requerido.</span>}

                    <p className="text-black dark:text-white mt-6">Tipo de tarea</p>

                    <select className='bg-transparent mt-2 text-xs disabled:opacity-40'
                        value={type}
                        onChange={(e) => setType(+e.target.value)}
                    >
                        <option value="-1">Por defecto</option>
                        {
                            types_todos.map((el) => {
                                return <option key={el.id} value={el.id}>{el.type}</option>
                            })
                        }
                    </select>

                    <div className="flex justify-end mt-4">
                        <button className="btn-item mr-4 p-2" onClick={() => setIsEditable(false)} type="button">Cancelar</button>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditableTodo;
