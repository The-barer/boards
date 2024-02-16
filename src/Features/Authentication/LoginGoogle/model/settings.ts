import { config } from '@/Shared/Api'
import { IAuthConfig } from '../types/types'

export const settings: IAuthConfig = {
    baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    searchParams: {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: config.AUTH_REDIRECT_URL,
        display: 'popup',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        response_type: 'code',
        state: Math.trunc(Math.random() * 19890903).toString(),
    },
}
