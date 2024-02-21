import { config } from '@/Shared/Config'

import { IAuthConfig } from '../types/types'

// https://vk.com/dev/authcode_flow_user

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
