import { config } from '@/Shared/Config'

import { makeURL } from '@/Shared/Lib/Helpers'

// https://vk.com/dev/authcode_flow_user

export const vkAuthUrl = makeURL({
    baseUrl: 'https://oauth.vk.com/authorize',
    searchParams: {
        client_id: import.meta.env.VITE_VK_CLIENT_ID,
        redirect_uri: config.AUTH_REDIRECT_URL,
        display: 'popup',
        scope: 'email',
        response_type: 'code',
        state: 'vk',
    },
})
