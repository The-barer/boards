import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/reduxHooks";
import { logout } from "../Store/User/userSlice";
import { useIsAuth } from "../Hooks/useIsAuth";
import { IUserAuthResponse } from "../Types/types";

export const SidePanel: FC = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: IUserAuthResponse | null = useAppSelector(
    (state) => state.user.user
  );

  const userName = user?.name || user?.email || user?.id || "Anonymos";

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
          <h3 style={{ margin: "0 auto" }}> Hello, {userName} !</h3>
          <div
            className="links"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <button onClick={() => navigate("/")}>Главная</button>
            <button onClick={() => navigate("/main")}>Личная страница</button>
          </div>
          <button onClick={() => dispatch(logout())}>Выйти</button>
        </div>
      )}
    </>
  );
};
