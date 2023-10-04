import { IAuthConfig } from "../Types/types";
type AuthConfig = {
  vk: IAuthConfig;
  google: IAuthConfig;
};

// https://vk.com/dev/authcode_flow_user
// https://developers.google.com/identity/protocols/oauth2/native-app?hl=ru

export const authConfig: AuthConfig = {
  vk: {
    type: "vk",
    baseUrl: "https://oauth.vk.com/authorize",
    searchParams: {
      client_id: import.meta.env.VITE_VK_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
      display: "popup",
      scope: "email",
      response_type: "code",
      state: Math.trunc(Math.random() * 19890903).toString(),
    },
  },
  google: {
    type: "google",
    baseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    searchParams: {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
      scope: "email",
      response_type: "code",
      state: Math.trunc(Math.random() * 19890903).toString(),
    },
  },
};
