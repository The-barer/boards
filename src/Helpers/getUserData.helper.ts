import { getAccessTokenFromLocalStorage } from "./localStorage.helper";
import { authService } from "../Services/auth.service";

export const getUserData = async () => {
  const accessToken = getAccessTokenFromLocalStorage();
  try {
    if (accessToken) {
      const data = await authService.getAuth();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
