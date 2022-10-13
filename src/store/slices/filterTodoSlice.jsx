import { createSlice } from '@reduxjs/toolkit'


const filterTodoSlice = createSlice({
    name: 'filter_todos',
    initialState: {
        done: localStorage.filters_todos?JSON.parse(localStorage.filters_todos).done:false,
        selectedType: localStorage.filters_todos?JSON.parse(localStorage.filters_todos).selectedType:-1,
        all: localStorage.filters_todos?JSON.parse(localStorage.filters_todos).all:true,
    },
    reducers: {

        setDone: (state, action) => {
            state.done = action.payload
            localStorage.filters_todos = JSON.stringify(state)
        },
        setSelectedType: (state, action) => {
            state.selectedType = +action.payload
            localStorage.filters_todos = JSON.stringify(state)
        },
        setAll: (state, action) => {
            state.all = action.payload
            localStorage.filters_todos = JSON.stringify(state)
        },
        resetFilters: (state, action) => {
            state = {...action.payload}
        }
    }
    
})

export const { setAll, setDone, setSelectedType, resetFilters } = filterTodoSlice.actions

export default filterTodoSlice.reducer