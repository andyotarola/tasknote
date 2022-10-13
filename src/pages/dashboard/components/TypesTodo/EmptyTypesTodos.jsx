import React from 'react';
import voidSvg from '@/assets/images/empty.svg';

const EmptyTypesTodos = () => {
    
    return (
        <>
            <div className="flex-col mb-4">
                <img className="w-full h-80 md:h-82"  src={voidSvg} alt="No hay tipos de tareas" />
                <p className="text-center mt-8 text-sm">No hay tipos de tareas disponibles.</p>
            </div>
        </>
    );
}

export default EmptyTypesTodos;
