import React, { useState } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import DropdownFilter from './DropdownFilter';

const FilterTodo = () => {
    
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="flex justify-between relative">
            <h1 className="
                text-2xl
                dark:text-white
                text-slate-900
                font-extrabold
                tracking-tight
            ">
                Tareas
            </h1>

            <div className="dropdown">
                <button className="btn-item p-2 flex dropdowm-btn" onClick={() => setShowFilters(true)}>
                    FILTRO
                    <AdjustmentsIcon className="ml-2 w-5 h-5 rotate-90" />
                </button>

                {
                    showFilters &&
                    <DropdownFilter
                        setShowFilters={setShowFilters}
                    />
                }
            </div>

        </div>
    );
}

export default FilterTodo;
