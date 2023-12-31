import { combineReducers } from '@reduxjs/toolkit'

import { sessionSlice } from '@/Entities/Session'
import { userSlice } from '@/Entities/User'
import { boardsSlice } from '@/Entities/Boards'
import { tasksSlice } from '@/Entities/Tasks'
import { baseApi } from '@/Shared/Api'

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
})
