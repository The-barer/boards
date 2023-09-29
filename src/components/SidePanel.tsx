import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/reduxHooks";
import { logout } from "../Store/User/userSlice";
import { useAuth } from "../Hooks/useAuth";
import { removeTokenFromLocalStorage } from "../Helpers/localStorage.helper";
import { IUser } from "../Types/types";

export const SidePanel: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const handelLogout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage();
  };
  const user: IUser | null = useAppSelector((state) => state.user.user);
  const email = user?.email || "Anonymos";
  return (
    <>
      {isAuth && (
        <div
          className="side-panel-main"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.5)",
            justifyContent: "space-between",
            height: "100%",
            width: "20%",
            padding: "10px",
          }}
        >
          <h3 style={{ margin: "0 auto" }}> Hello, {email} !</h3>
          <NavLink to="/secret">Страница категорий</NavLink>
          <button onClick={handelLogout}>Выйти</button>
        </div>
      )}
    </>
  );
};
