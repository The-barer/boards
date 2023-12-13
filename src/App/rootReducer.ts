import { combineReducers } from '@reduxjs/toolkit'

import { sessionSlice } from '@/Entities/Session'
import { userSlice } from '@/Entities/User'
import { categoriesSlice } from '@/Entities/Category'
import { baseApi } from '@/Shared/Api'

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
})
