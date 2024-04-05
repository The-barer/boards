import { config } from '@/Shared/Config'

import { makeURL } from '@/Shared/Lib/Helpers'

// https://developers.google.com/identity/protocols/oauth2/native-app?hl=ru

export const googleAuthUrl = makeURL({
    baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    searchParams: {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: config.AUTH_REDIRECT_URL,
        display: 'popup',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        response_type: 'code',
        state: 'google',
    },
})
