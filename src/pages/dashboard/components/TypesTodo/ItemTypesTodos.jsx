import React, { useState } from 'react';
import DataTypeTodo from './DataTypeTodo';
import EditableTypeTodo from './EditableTypeTodo';

const ItemTypesTodos = ({item}) => {

    const [isEditable, setIsEditable] = useState(false)

    if(isEditable){
        return <EditableTypeTodo item={item} setIsEditable={setIsEditable}/>
    }else {
        return <DataTypeTodo  item={item} setIsEditable={setIsEditable} />
    }
    
}

export default ItemTypesTodos;
