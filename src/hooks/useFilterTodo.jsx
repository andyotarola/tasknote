import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useFilterTodo = ( search, selectedType, done, all) => {

    const {todos} = useSelector(state => state.todos)

    const [filteredTodos, setFilteredTodos] = useState([])    
    
    useEffect(()=> {

        let data = []

        if(all){
            data =  todos.filter(el => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) === 0)
                            .sort((a, b) => {
                                if(a.type_todo_id > b.type_todo_id) return a.type_todo_id - b.type_todo_id
                                if(a.updated_at > b.updated_at) return - 1
                                
                            })
                            .sort((a, b)=> !a.done && -1)
                            
        }else {

            if(selectedType === -1){
                data = todos.filter(el => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) === 0)
                            .filter(el => el.type_todo_id === null)
                            .filter(el => el.done === done)
                            .sort((a, b) => {
                                if(a.updated_at > b.updated_at) return -1
                            })
            }else{
                data = todos.filter(el => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) === 0)
                            .filter(el => el.type_todo_id === selectedType)
                            .filter(el => el.done === done)
                            .sort((a, b) => {
                                if(a.updated_at > b.updated_at) return -1
                            })
            }
        }

        setFilteredTodos(data)


    },[search , done, selectedType, all, todos])


    return  { filteredTodos }
}

export default useFilterTodo