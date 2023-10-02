import { useAppSelector } from "./reduxHooks";

export const useIsAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth;
};
