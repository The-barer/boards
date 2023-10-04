import { todoAppServer } from "../Api/axios.api";

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

  async login0Auth(
    code: string,
    type: string
  ): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.post<IUserAuthResponse>(
      `auth/login/${type}`,
      { code }
    );

    return data;
  },

  async getAuth(): Promise<IUserAuthResponse | undefined> {
    const { data } = await todoAppServer.get<IUserAuthResponse>("auth/profile");
    if (data) return data;
  },
};
