import React from 'react';

import { useSelector } from 'react-redux'
import ItemTypesTodos from './ItemTypesTodos';

const ListTypesTodos = () => {
    const {types_todos} = useSelector(state => state.types_todos)

    return (
        <>
            <div className="mt-4">
                <ul>
                    {
                        types_todos.map((item) => {
                            return <ItemTypesTodos item={item} key={item.id}/>
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default ListTypesTodos;
