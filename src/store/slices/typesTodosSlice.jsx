import { createSlice } from '@reduxjs/toolkit'

const typesTodosSlice = createSlice({
    name: 'types_tods',
    initialState: {
        types_todos: [],
        loading: false
    },
    reducers: {

        setTypesTodosLoading: (state, action) => {
            state.loading = action.payload
        },
        setTypesTodos: (state, action) => {
            state.loading = false
            state.types_todos = action.payload
        },

        insertTypeTodo: (state, action) => {
            state.types_todos = [...state.types_todos, action.payload]
        },

        updateTypesTodos: (state, action) => {
            state.types_todos = state.types_todos.map(el => {
                if(el.id === action.payload.id){
                    el = action.payload
                }
                return el
            })
        },
        
        deleteTypeTodo: (state, action) => {
            state.types_todos = state.types_todos.filter(el => el.id !== action.payload)
        },

        removeTypesTodos: (state, action) => {
            state.types_todos = []
            state.loading = false
        }

    }
})

export const 
{
    setTypesTodos, 
    setTypesTodosLoading, 
    updateTypesTodos, 
    deleteTypeTodo, 
    insertTypeTodo, 
    removeTypesTodos
}  = typesTodosSlice.actions

export default typesTodosSlice.reducer