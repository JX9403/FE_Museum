import React from "react";

import "./homepage.scss";
import Carousel from "../../components/carousel/Carousel";
import AuthorCard from "../../components/AuthorCard/AuthorCard";

export default function HomePage() {
  const cards = [1, 2, 3, 4];
  return (
    <div>
      <Carousel />
      <div className="container">
        <div className="section-author mt-4">
          <div className="section-header d-flex justify-content-between align-items-center">
            <h2 className="colre-dark-text">Tác giả </h2>
            <div>
              <a href="#" className="color-dark-text">
                Xem thêm
                <i className="fa-solid fa-arrow-right px-2 color-dark-text"></i>
              </a>
            </div>
          </div>

          <hr className="border-2 my-2" />

          <div className="list py-4">
            <div className="row g-6">
              {cards.map((author, index) => (
                <AuthorCard author={author} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
