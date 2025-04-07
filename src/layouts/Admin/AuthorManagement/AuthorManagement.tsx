import React from "react";
import AuthorForm from "./AuthorCreate";
import AuthorSearch from "./AuthorSearch";
import AuthorTable from "./AuthorTable";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthorManagement() {
  return (
    <div className="manage-author ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ TÁC GIẢ</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
{
  /* <AuthorForm />; */
}
