import { useAppSelector } from "./reduxHooks";

export const useAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth;
};
