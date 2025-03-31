import React from "react";
import "./authorcard.scss";
interface AuthorCardProps {
  author: number;
  key: number;
}

export default function AuthorCard(prop: AuthorCardProps) {
  return (
    <div className="col-3" key={prop.key}>
      <div className="card">
        <a href="#">
          <div className="image-container">
            <img
              src="https://baotangvanhoc.vn/wp-content/uploads/2022/01/Nha-van-Le-Van-Thao.jpg"
              className="card-img-top"
              alt="..."
            />
          </div>
        </a>
        <div className="card-body">
          <h5 className="card-title">
            <a href="#" className="color-dark-text">
              Card title
            </a>
          </h5>
          <p className="card-text text-truncate">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
}
