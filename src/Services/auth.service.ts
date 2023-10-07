import todoAppServer from "../Api/axios.api";

import { ILoginFormFields, IUserAuthResponse } from "../Types/types";
export const authService = {
  async registration(
    regData: ILoginFormFields
  ): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.post<IUserAuthResponse>(
      "user/reg",
      regData
    );
    return data;
  },

  async login(
    loginData: ILoginFormFields
  ): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.post<IUserAuthResponse>(
      "auth/login",
      loginData
    );
    return data;
  },
  async logout() {
    try {
      await todoAppServer.get("auth/logout");
    } catch (error) {
      console.log(error);
    }
  },

  async login0Auth(
    params: URLSearchParams,
    type: string
  ): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.get<IUserAuthResponse>(
      `auth/login/${type}`,
      {
        params,
      }
    );
    return data;
  },

  async getAuth(): Promise<IUserAuthResponse | undefined> {
    try {
      const { data } = await todoAppServer.get<IUserAuthResponse>(
        "auth/profile"
      );
      if (data) return data;
    } catch (error) {
      console.log("Нет данных авторизации");
    }
  },
};
