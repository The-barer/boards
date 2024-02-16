import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '../Shared/Api'
import { invalidateAccessTokenListener } from '@/Entities/Session'
import { rootReducer } from './rootReducer'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'

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
