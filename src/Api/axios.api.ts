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
  const token = getAccessTokenFromLocalStorage();
  if (token && !jwtExp(token)) {
    removeTokenFromLocalStorage();
  }

  config.headers.Authorization = `Bearer ${token}`;
  config.withCredentials = false;
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
        .get(`${serverHost}/auth/token`, {
          withCredentials: true,
        })
        .then((data) => {
          const { accessToken }: ITokens = data.data;
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
