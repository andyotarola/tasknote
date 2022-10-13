import { configureStore } from '@reduxjs/toolkit'

import theme  from './slices/themeSlice'
import user from './slices/userSlice'
import types_todos from './slices/typesTodosSlice'
import filter_todos from './slices/filterTodoSlice'
import todos from './slices/todoSlice'

const store = configureStore({
    reducer: {
       theme,
       user,
       types_todos,
       filter_todos,
       todos
    }
})

export default store 