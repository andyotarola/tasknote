import React, { useState } from 'react';
import DataTodo from './DataTodo';
import EditableTodo from './EditableTodo';

const TodoItem = ({item}) => {

    const [isEditable, setIsEditable] = useState(false)

    if(isEditable){
        return <EditableTodo item={item} setIsEditable={setIsEditable}/>
    }else {
        return <DataTodo item={item} setIsEditable={setIsEditable} />
    }
}

export default TodoItem;
