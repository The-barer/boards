import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AccessToken, IUserAuthData, SessionSlice } from './sessionTypes'
import {
    removeTokenFromLocalStorage,
    setAccessTokenToLocalStorage,
} from '@/Shared/Lib/Helpers/localStorage.helper'
import { sessionApi } from '../api/session.api'

const initialState: SessionSlice = {
    accessToken: null,
    isAuthorized: null,
    loading: false,
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        clearSessionData: (state) => {
            state.accessToken = null
            state.isAuthorized = false
            removeTokenFromLocalStorage()
        },
        setToken: (state, { payload }: PayloadAction<string>) => {
            state.isAuthorized = true
            state.accessToken = payload
            setAccessTokenToLocalStorage(payload)
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                sessionApi.endpoints.login.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.isAuthorized = true
                    state.accessToken = payload.accessToken
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(
                sessionApi.endpoints.signin.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.isAuthorized = true
                    state.accessToken = payload.accessToken
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(
                sessionApi.endpoints.loginVK.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.isAuthorized = true
                    state.accessToken = payload.accessToken
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(sessionApi.endpoints.logout.matchFulfilled, (state) => {
                state.accessToken = null
                state.isAuthorized = false
                removeTokenFromLocalStorage()
            })

            .addMatcher(
                sessionApi.endpoints.refreshToken.matchFulfilled,
                (state, { payload }: PayloadAction<AccessToken>) => {
                    state.isAuthorized = true
                    state.accessToken = payload.accessToken
                    state.loading = false
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(sessionApi.endpoints.refreshToken.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.refreshToken.matchRejected, (state) => {
                state.isAuthorized = false
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
    },
})

export const { clearSessionData, setToken } = sessionSlice.actions

export const selectIsAuthorized = (state: RootState) => state.session.isAuthorized
export const selectSession = (state: RootState) => state.session
export const selectAccessToken = (state: RootState) => state.session.accessToken

export default sessionSlice.reducer
