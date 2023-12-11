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
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
    },
})

export const { clearSessionData, setToken } = sessionSlice.actions

export const selectIsAuthorized = (state: RootState) => state.session.isAuthorized
export const selectAccessToken = (state: RootState) => state.session.accessToken

export default sessionSlice.reducer
