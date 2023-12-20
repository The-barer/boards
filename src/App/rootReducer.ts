import { combineReducers } from '@reduxjs/toolkit'

import { sessionSlice } from '@/Entities/Session'
import { userSlice } from '@/Entities/User'
import { boardsSlice } from '@/Entities/Boards'
import { baseApi } from '@/Shared/Api'

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
})
