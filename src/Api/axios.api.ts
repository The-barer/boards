import axios, { AxiosError } from "axios";
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../Helpers/localStorage.helper";
import { authService } from "../Services/auth.service";

const todoAppServer = axios.create({
  baseURL: "http://localhost:4003/api/",
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
      try {
        const tokens = await authService.refreshTokens();
        tokens && setAccessTokenToLocalStorage(tokens.accessToken);
        console.log("Получены новые токены!");
        return originalRequest && todoAppServer.request(originalRequest);
      } catch (error) {
        console.log("Требуется авторизация");
      }
    }
  }
);

export default todoAppServer;
