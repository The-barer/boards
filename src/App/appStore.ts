import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'

import { invalidateAccessTokenListener } from '@/Entities/Session'

import { baseApi } from '@/Shared/Api'
import { sessionSlice } from '@/Entities/Session'
import { userSlice } from '@/Entities/User'
import { boardsSlice } from '@/Entities/Boards'
import { tasksSlice } from '@/Entities/Tasks'

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
