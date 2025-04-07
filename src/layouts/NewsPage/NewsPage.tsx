import React from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import { NavLink } from "react-router-dom";
import "./newspage.scss";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Pagi } from "../../components/Pagi/Pagi";
import SearchNews from "./SearchNews";
export default function NewsPage() {
  const news = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const pagi = (current: number) => {
    // setCurrentPage(current);
  };
  return (
    <div className="page-news color-primary-bg ">
      <div className="page-header">
        <div className="overlay">
          <h1 className="header-text-top color-light-text ">TIN TỨC</h1>
          <div className="header-text color-light-text ">
            <NavLink to="/" className="color-light-text">
              Trang chủ
            </NavLink>
            <span className="separator color-light-text"> / </span>
            <NavLink to="/news" className="color-light-text">
              Tin tức
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

      <SearchNews />
      <div className="page-list">
        <div className="container">
          <div className="row">
            {news.map((news, index) => (
              <NewsCard news={news} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={0} totalPages={10} pagi={pagi} />
    </div>
  );
}
