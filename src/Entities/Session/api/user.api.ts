import { IUserAuthData } from '@/Entities/Session/model/sessionTypes'

import { USER_TAG, baseApi } from '@/Shared/Api'

import { IUserActivated, IUserProfileData } from '../model/userTypes'

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateProfile: build.mutation<IUserAuthData, IUserProfileData>({
            query: (body) => ({
                url: `/user/profile`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [USER_TAG],
        }),

        profile: build.query<IUserProfileData, void>({
            query: () => ({
                url: `/user/profile`,
            }),
            providesTags: [USER_TAG],
        }),

        activateUser: build.mutation<IUserActivated, string>({
            query: (code) => ({
                url: `user/activate/${code}`,
                method: 'GET',
            }),
            invalidatesTags: [USER_TAG],
        }),
    }),
})

export const { useProfileQuery, useUpdateProfileMutation, useActivateUserMutation } = userApi
