import { config } from '@/Shared/Api'
import { IAuthConfig } from '../types/types'

export const settings: IAuthConfig = {
    baseUrl: 'https://oauth.vk.com/authorize',
    searchParams: {
        client_id: import.meta.env.VITE_VK_CLIENT_ID,
        redirect_uri: config.AUTH_REDIRECT_URL,
        display: 'popup',
        scope: 'email',
        response_type: 'code',
        state: Math.trunc(Math.random() * 19890903).toString(),
    },
}
