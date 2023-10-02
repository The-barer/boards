import { todoAppServer } from "../Api/axios.api";
import { ILoginFormFields, IUser, IQueryParse } from "../Types/types";

export const authService = {
  async registration(regData: ILoginFormFields): Promise<IUser | undefined> {
    const { data } = await todoAppServer.post<IUser>("user/reg", regData);
    return data;
  },

  async login(loginData: ILoginFormFields): Promise<IUser | undefined> {
    const { data } = await todoAppServer.post<IUser>("auth/login", loginData);
    return data;
  },

  async loginVK(vkdata: IQueryParse): Promise<IUser | undefined> {
    const { data } = await todoAppServer.post<IUser>("auth/login/vk", vkdata);
    return data;
  },

  async getAuth(): Promise<IUser | undefined> {
    const { data } = await todoAppServer.get<IUser>("auth/profile");
    if (data) return data;
  },
};
