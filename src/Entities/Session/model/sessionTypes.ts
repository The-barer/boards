import { IUserProfileData } from '@/Entities/User/'

export type SessionSlice = {
    accessToken: string | null
    loading: boolean
    profile: IUserProfileData | null
}

export interface IUserAuthData {
    user: IUserProfileData
    accessToken: string
}

export type AccessToken = {
    accessToken: string
}
