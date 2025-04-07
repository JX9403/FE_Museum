import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import HeaderAdmin from "./header/HeaderAdmin";
import Sidebar from "./Admin/Sidebar/Sidebar";

export default function LayoutAdmin() {
  return (
    <div className="color-bg-primary layout-admin">
      <HeaderAdmin />
      <div className="d-flex">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content p-3 flex-fill">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
