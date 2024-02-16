import { IUserLoginData, IUserUpdateData } from '@/Entities/User'
import { IToken } from '@/Shared/Lib/Types/types'
import { SESSION_TAG, USER_TAG, baseApi } from '@/Shared/Api'
import { IUserAuthData } from '../model/sessionTypes'

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signin: build.query<IUserAuthData, IUserUpdateData>({
            query: (body) => ({
                url: `/auth/signin`,
                method: 'POST',
                body,
            }),
        }),

        login: build.query<IUserAuthData, IUserLoginData>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body,
            }),
            providesTags: [SESSION_TAG],
        }),

        loginVK: build.query<IUserAuthData, string>({
            query: (searchParams) => ({
                url: `/auth/login/vk?${searchParams}`,
                method: 'GET',
            }),
            providesTags: [SESSION_TAG],
        }),

        loginGoogle: build.query<IUserAuthData, string>({
            query: (searchParams) => ({
                url: `/auth/login/google?${searchParams}`,
                method: 'GET',
            }),
            providesTags: [SESSION_TAG],
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'GET',
            }),
        }),

        refreshToken: build.mutation<IToken, void>({
            query: () => ({
                url: `/auth/token`,
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: [USER_TAG],

            // transformResponse: (response: { data: IToken }) => response.data,
        }),
    }),
})

export const {
    useLogoutMutation,
    useSigninQuery,
    useRefreshTokenMutation,
    useLoginQuery,
    useLoginVKQuery,
    useLoginGoogleQuery,
} = sessionApi
