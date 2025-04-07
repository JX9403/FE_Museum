import React from "react";
import "./workcard.scss";
interface WorkCardProps {
  work: number;
  key: number;
}

export default function WorkCard(props: WorkCardProps) {
  return (
    <div className="row border border-secondary-subtle rounded mx-0 p-4 mb-4">
      <div className="col-md-9">
        <a href="#" className="color-dark-text">
          <h4 className="mt-0">
            Câu lạc bộ Di sản Áo dài Việt Nam tham quan Bảo tàng Văn học Việt
            Nam
          </h4>
        </a>
        <p className="text-truncated">
          Sáng ngày 13.3, đoàn CLB Di sản Áo Dài Việt Nam đã có buổi tham quan
          tại Bảo tàng Văn học Việt Nam.
        </p>
      </div>

      <div className="image-container col-md-3 rounded">
        <a href="#">
          {" "}
          <img
            src="https://baotangvanhoc.vn/wp-content/uploads/2025/03/z6405022071291_71e72380c5f3443e8777f2a6978290ee-2048x1536.jpg"
            className="flex-shrink-0 me-3 rounded"
            alt="..."
          />
        </a>
      </div>
    </div>
  );
}
