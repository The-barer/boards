import { authService } from "../Services/auth.service";

export const getUserData = async () => {
  try {
    const data = await authService.getAuth();
    return data;
  } catch (error) {
    console.log(error);
  }
};
