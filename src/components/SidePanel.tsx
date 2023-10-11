import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/reduxHooks";
import { logout } from "../Store/User/userSlice";
import { useIsAuth } from "../Hooks/useIsAuth";
import { IUserResponse } from "../Types/types";

export const SidePanel: FC = () => {
  const avatarStyle: React.CSSProperties = {
    borderRadius: "50%",
    boxShadow: "4px 4px 14px rgba(77, 77, 77, 0.25)",
    display: "inline-block",
    width: "6em",
    height: "6em",
    boxSizing: "border-box",
    margin: "0px auto",
    verticalAlign: "top",
  };

  const isAuth = useIsAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: IUserResponse | null = useAppSelector((state) => state.user.user);

  const userName = user?.userName || user?.email || "Anonymos";

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
          <div
            className="userInfo"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {user?.photo && <img src={user?.photo} style={avatarStyle}></img>}
            <h3 style={{ margin: "0 auto" }}> {userName} </h3>
          </div>
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
