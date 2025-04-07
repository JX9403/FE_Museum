import React from "react";

import "./homepage.scss";
import Carousel from "../../components/carousel/Carousel";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import NewsCard from "../../components/NewsCard/NewsCard";
import WorkCard from "../../components/WorkCard/WorkCard";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  const cards = [1, 2, 3];
  const works = [1, 2, 3];
  const news = [1, 2, 3];
  return (
    <>
      <div className="color-primary-bg">
        <Carousel />
        <div className="container">
          <div className="section-news pt-4">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h2 className="color-red-text">TIN TỨC</h2>
              <div>
                <NavLink to="/news" className="color-dark-text">
                  Xem thêm
                  <i className="fa-solid fa-arrow-right px-2 color-dark-text"></i>
                </NavLink>
              </div>
            </div>

            <hr className="border-2 my-2" />

            <div className="list py-4">
              <div className="row ">
                {cards.map((news, index) => (
                  <NewsCard news={news} key={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="section-author pt-4">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h2 className="color-red-text">TÁC GIẢ</h2>
              <div>
                <NavLink to="/authors" className="color-dark-text">
                  Xem thêm
                  <i className="fa-solid fa-arrow-right px-2 color-dark-text"></i>
                </NavLink>
              </div>
            </div>

            <hr className="border-2 my-2" />

            <div className="list py-4">
              <div className="row">
                {cards.map((author, index) => (
                  <AuthorCard author={author} key={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="section-author py-4">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h2 className="color-red-text">TÁC PHẨM</h2>
              <div>
                <NavLink to="/news" className="color-dark-text">
                  Xem thêm
                  <i className="fa-solid fa-arrow-right px-2 color-dark-text"></i>
                </NavLink>
              </div>
            </div>

            <hr className="border-2 my-2" />

            <div className="list mt-4 ">
              {works.map((work, index) => (
                <WorkCard work={work} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
