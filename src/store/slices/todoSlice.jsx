import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false
    },
    reducers: {
        setTodosLoading: (state, action) => {
            state.loading = action.payload
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        },

        updateTodo: (state, action) => {
            state.todos = state.todos.map(el => {
                if(el.id === action.payload.id){
                    el = action.payload
                    return el
                }
                return el
            })
        },

        setDone: (state, action) => {
            state.todos = state.todos.map((el) => {
                if(el.id === action.payload.id){
                    el.done = action.payload.done
                    return el
                }

                return el
            })
        },

        insertTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },

        deleteTodo : (state, action) => {
            state.todos = state.todos.filter(el => el.id !== action.payload)
        },

        removeTodos : (state, actiion) => {
            state.todos = []
            state.loading = false
        }
        
    }
})

export const { setTodos, setTodosLoading, updateTodo, deleteTodo, insertTodo, setDone, removeTodos} = todoSlice.actions

export default todoSlice.reducer 