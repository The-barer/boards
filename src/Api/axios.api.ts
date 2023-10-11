import axios, { AxiosError } from "axios";
import {
  getAccessTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../Helpers/localStorage.helper";
import { ITokens } from "../Types/types";
import { jwtExp } from "../Helpers/jwt.helper";

const serverHost = import.meta.env.VITE_SERVER_HOST + "/api";
const todoAppServer = axios.create({
  baseURL: serverHost,
  withCredentials: true,
});

todoAppServer.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessTokenFromLocalStorage()}`;
  return config;
});

todoAppServer.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const token = getAccessTokenFromLocalStorage();
      if (token && !jwtExp(token)) {
        removeTokenFromLocalStorage();
      }
      try {
        const { data: tokens }: { data: ITokens } = await axios.get(
          `${serverHost}/auth/token`,
          {
            withCredentials: true,
          }
        );
        console.log("Получены новые токены: ", tokens);
        tokens && setAccessTokenToLocalStorage(tokens.accessToken);
        return originalRequest && todoAppServer.request(originalRequest);
      } catch (error) {
        console.log("Требуется авторизация");
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export default todoAppServer;
