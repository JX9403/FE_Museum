import React from "react";

import logo from "../../assets/images/cropped-logo-.png";
import "./header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header color-primary-bg">
      <div className="header-top color-red-bg color-yellow-text d-flex justify-content-between">
        <div className="text-start">BẢO TÀNG VĂN HỌC VIỆT NAM</div>
        <div className="text-end">ĐĂNG NHẬP | ĐĂNG KÝ</div>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img className="header-logo" src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <NavLink className="nav-link" aria-current="page" to="/">
                  TRANG CHỦ
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link " aria-current="page" to="/news">
                  TIN TỨC
                </NavLink>
              </li>
              <li className="nav-item me-3 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  DANH MỤC
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="/authors"
                    >
                      Tác giả
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="/works"
                    >
                      Tác phẩm
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Câu chuyện
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item me-3">
                <a className="nav-link" aria-current="page" href="#">
                  THÔNG TIN BẢO TÀNG
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link" aria-current="page" href="#">
                  PHÒNG TRƯNG BÀY ẢO
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link" aria-current="page" href="#">
                  BẢNG XẾP HẠNG
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
