import axios, { AxiosError } from "axios";
import {
  getAccessTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../Shared/Lib/Helpers/localStorage.helper";
import { IToken } from "../Lib/Types/types";
import { jwtNotExp } from "../../Shared/Lib/Helpers/jwt.helper";
import { config } from "./config";

const todoAppServer = axios.create({
  baseURL: config.API_ENDPOINT,
  withCredentials: true,
});

todoAppServer.interceptors.request.use((config) => {
  const token = getAccessTokenFromLocalStorage();
  if (token && !jwtNotExp(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = false;
  } else {
    removeTokenFromLocalStorage();
  }

  return config;
});

todoAppServer.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const newToken = await axios
        .get(`${config.API_ENDPOINT}/auth/token`, {
          withCredentials: true,
        })
        .then((data) => {
          const { accessToken }: IToken = data.data;
          accessToken && setAccessTokenToLocalStorage(accessToken);

          return true;
        })
        .catch((err: AxiosError) => {
          console.log(err.response?.data);
          return false;
        });
      if (newToken) {
        console.log("Получен новый токен! Обновляю страницу");
        return originalRequest && todoAppServer.request(originalRequest);
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export default todoAppServer;
