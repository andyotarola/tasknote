import React from 'react';

const SearchTodo = ({setSearch, search}) => {
    return (
        <div className="w-full my-6">
            <input
                className="w-full bg-transparent"
                type="text"
                placeholder="Buscar tarea ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default SearchTodo;
