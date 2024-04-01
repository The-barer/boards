import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AccessToken, IUserAuthData, SessionSlice } from './sessionTypes'
import {
    removeTokenFromLocalStorage,
    setAccessTokenToLocalStorage,
} from '@/Shared/Lib/Helpers/localStorage.helper'
import { sessionApi } from '../api/session.api'
import { userApi } from '../api/user.api'
import { IUserProfileData } from '..'

const initialState: SessionSlice = {
    accessToken: null,
    loading: false,
    profile: null,
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        clearSessionData: (state) => {
            state.accessToken = null
            removeTokenFromLocalStorage()
        },
        setToken: (state, { payload }: PayloadAction<string>) => {
            state.accessToken = payload
            state.loading = false
            setAccessTokenToLocalStorage(payload)
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                sessionApi.endpoints.login.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.accessToken = payload.accessToken
                    state.loading = false
                    state.profile = payload.user
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(
                sessionApi.endpoints.signin.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.accessToken = payload.accessToken
                    state.loading = false
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(
                sessionApi.endpoints.loginVK.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.accessToken = payload.accessToken
                    state.loading = false

                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(
                sessionApi.endpoints.loginGoogle.matchFulfilled,
                (state, { payload }: PayloadAction<IUserAuthData>) => {
                    state.accessToken = payload.accessToken
                    state.loading = false
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(sessionApi.endpoints.logout.matchFulfilled, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })

            .addMatcher(
                sessionApi.endpoints.refreshToken.matchFulfilled,
                (state, { payload }: PayloadAction<AccessToken>) => {
                    state.accessToken = payload.accessToken
                    state.loading = false
                    setAccessTokenToLocalStorage(payload.accessToken)
                },
            )
            .addMatcher(sessionApi.endpoints.refreshToken.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.login.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.signin.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.loginGoogle.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.loginVK.matchPending, (state) => {
                state.loading = true
            })
            .addMatcher(sessionApi.endpoints.refreshToken.matchRejected, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
            .addMatcher(sessionApi.endpoints.login.matchRejected, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
            .addMatcher(sessionApi.endpoints.signin.matchRejected, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
            .addMatcher(sessionApi.endpoints.loginGoogle.matchRejected, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
            .addMatcher(sessionApi.endpoints.loginVK.matchRejected, (state) => {
                state.accessToken = null
                state.loading = false
                removeTokenFromLocalStorage()
            })
            .addMatcher(
                userApi.endpoints.profile.matchFulfilled,
                (state, { payload }: PayloadAction<IUserProfileData>) => {
                    state.profile = payload
                },
            )
    },
})

export const { clearSessionData, setToken } = sessionSlice.actions

export const selectIsAuthorized = (state: RootState) => !!state.session.profile
export const selectisLoading = (state: RootState) => state.session.loading
export const selectSession = (state: RootState) => state.session
export const selectAccessToken = (state: RootState) => state.session.accessToken

export default sessionSlice.reducer
