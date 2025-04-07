import React from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import { NavLink } from "react-router-dom";
import "./authorpage.scss";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function AuthorPage() {
  const authors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pagi = (current: number) => {
    // setCurrentPage(current);
  };
  return (
    <div className="page-author color-primary-bg">
      <div className="page-header">
        <div className="overlay">
          <h1 className="header-text-top color-light-text ">TÁC GIẢ</h1>
          <div className="header-text color-light-text ">
            <NavLink to="/" className="color-light-text">
              Trang chủ
            </NavLink>
            <span className="separator color-light-text"> / </span>
            <NavLink to="/authors" className="color-light-text">
              Tác giả
            </NavLink>
          </div>
        </div>
        <div className="container-image">
          <img
            src={slide1}
            className="d-block w-100 centered-image "
            alt="..."
          />
        </div>
      </div>

      <div className="page-search"></div>
      <div className="page-list">
        <div className="container">
          <div className="row">
            {authors.map((author, index) => (
              <AuthorCard author={author} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={0} totalPages={10} pagi={pagi} />
    </div>
  );
}
