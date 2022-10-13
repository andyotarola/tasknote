import React, {useEffect} from 'react';
import supabase from '../client';
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/slices/userSlice';
import { setTypesTodos, setTypesTodosLoading } from '../store/slices/typesTodosSlice';
import { setTodos, setTodosLoading } from '../store/slices/todoSlice';

const ProtectedRoute = ({children}) => {

    const dispatch = useDispatch()
    
    const user  = supabase.auth.user()

    if(!user) return <Navigate to="/iniciar-sesion"></Navigate>

    useEffect(() => {
        
        const getProfile = async() => {
            
            const { data } = await supabase.from("profiles")
                            .select("fullname, username")
                            .eq("id", user.id)

            const profile = {
                id: user.id,
                email: user.email,
                fullname: data[0].fullname,
                username: data[0].username
            }

            dispatch(setUser(profile))
        }

        const getAllTypesTodos = async () => {

            dispatch(setTypesTodosLoading(true))

            const {data} = await supabase.from("types_todos")
                                    .select("id, created_at, updated_at, type, profile_id")
                                    .eq("profile_id", user.id)

            if(data.length > 0) dispatch(setTypesTodos(data))

            dispatch(setTypesTodosLoading(false))
            
        }

        const getAllTodos = async () => {

            dispatch(setTodosLoading(true))

            const {data} = await supabase.from("todos")
                                    .select("id, created_at, updated_at, name, profile_id, done, type_todo_id")

            if(data.length > 0) dispatch(setTodos(data))

            dispatch(setTodosLoading(false))
        }

        getProfile()
        getAllTypesTodos()
        getAllTodos()

    }, []);


    return children
}

export default ProtectedRoute;
