import { IAuthConfig } from "../Types/types";
type AuthConfig = {
  [propName: string]: IAuthConfig;
};

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
    baseUrl: "https://oauth.vk.com/authorize",
    searchParams: {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
      display: "popup",
      scope: "email",
      response_type: "code",
      state: "",
    },
  },
};
