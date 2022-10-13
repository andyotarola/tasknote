import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setAll, setDone, setSelectedType } from '@/store/slices/filterTodoSlice';

import clickedOut from '@/utils/clickedOut';

const DropdownFilter = ({ setShowFilters }) => {

    const { types_todos } = useSelector(state => state.types_todos)
    const { done, all, selectedType} = useSelector(state => state.filter_todos)
    
    const dispatch = useDispatch()

    clickedOut((e) => {
        if (e.target.closest(".dropdown") === null) {
            setShowFilters(false)
        }
    })

    return (
        <div
            className="dropdown-menu"
        >
            <div className="flex-col mb-4">
                <p className="text-black dark:text-white">Todo</p>
                <label className="block">
                    <span className="text-xs mr-2">Todas las tareas</span>
                    <input type="checkbox" checked={all} onChange={(e)=> dispatch(setAll(!all))}/>
                </label>
            </div>
            <div className="flex-col mb-4">
                <p className="text-black dark:text-white">Tipo de tarea</p>
                <select className='bg-transparent mt-2 text-xs disabled:opacity-40' 
                    value={selectedType} 
                    onChange={(e)=>dispatch(setSelectedType(e.target.value))}
                    disabled={all}
                >
                    <option value="-1">Por defecto</option>
                    {
                        types_todos.map((el) => {
                            return <option key={el.id} value={el.id}>{el.type}</option>
                        })
                    }
                </select>
            </div>
            <div className="flex-col">
                <p className="text-black dark:text-white">Completas</p>
                <select className="bg-transparent mt-2 text-xs disabled:opacity-40" 
                    disabled={all}
                    value={done} 
                    onChange={(e)=> dispatch(setDone(JSON.parse(e.target.value)))}
                >
                    <option value="false">Por hacer</option>
                    <option value="true">Hechos</option>
                </select>
            </div>
        </div>
    );
}

export default DropdownFilter;
