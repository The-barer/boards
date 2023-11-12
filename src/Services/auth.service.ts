import todoAppServer from "../Api/axios.api";

import {
  ILoginFormFields,
  IPlainObject,
  IUserAuthResponse,
  IUserResponse,
} from "../Types/types";

export const authService = {
  async registration(
    regData: ILoginFormFields
  ): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.post<IUserAuthResponse>(
      "auth/signin",
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
  async activateUser(
    code: string
  ): Promise<{ message: string; email: string } | undefined> {
    const { data } = await todoAppServer.get(`user/activate/${code}`);
    return data;
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

  async getAuth(): Promise<IUserResponse | undefined> {
    try {
      const { data } = await todoAppServer.get<IUserResponse>("user/profile");
      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateUserInfo(
    updateUserDTO: IPlainObject
  ): Promise<IUserResponse | undefined> {
    try {
      const { data } = await todoAppServer.patch<IUserResponse>(
        "user/profile",
        updateUserDTO
      );

      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  },
};
