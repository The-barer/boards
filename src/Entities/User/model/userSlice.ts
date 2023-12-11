import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUserProfileData, UserState } from './userTypes.ts'
import { userApi } from '../API/user.api.ts'

const initialState: UserState = {
    profile: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }: PayloadAction<IUserProfileData>) => {
            state.profile = payload
        },

        clearUserData: (state) => {
            state.profile = null
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.profile.matchFulfilled,
            (state, { payload }: PayloadAction<IUserProfileData>) => {
                state.profile = payload
            },
        )
    },
})

export const { setUserData, clearUserData } = userSlice.actions

export const selectUserData = (state: RootState) => state.user.profile

export default userSlice.reducer
