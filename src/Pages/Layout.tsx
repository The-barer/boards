import { Outlet } from "react-router-dom";
import { SidePanel } from "../Components/SidePanel";

export const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        height: "95vh",
      }}
    >
      <SidePanel />
      <div
        className="container"
        style={{ width: "70%", justifyContent: "center", margin: "auto" }}
      >
        <Outlet />
      </div>
    </div>
  );
};
