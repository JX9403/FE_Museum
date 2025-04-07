import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/vn.js"; // Ngôn ngữ tiếng Việt

import "./newspage.scss";

export default function SearchNews() {
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    if (fromDateRef.current) {
      flatpickr(fromDateRef.current, {
        dateFormat: "d/m/Y",
        locale: "vn",
        defaultDate: "01/01/2024", // Ngày mặc định
        onChange: (selectedDates, dateStr) => {
          setDateRange((prev) => ({ ...prev, from: dateStr || "01/01/2024" }));
        },
      });
    }

    if (toDateRef.current) {
      flatpickr(toDateRef.current, {
        dateFormat: "d/m/Y",
        locale: "vn",
        defaultDate: "31/12/2024", // Ngày mặc định
        onChange: (selectedDates, dateStr) => {
          setDateRange((prev) => ({ ...prev, to: dateStr || "31/12/2024" }));
        },
      });
    }
  }, []);

  const handleSearch = () => {
    const query = searchText || "Tất cả tin tức";
    const fromDate = dateRange.from || "01/01/2024";
    const toDate = dateRange.to || "31/12/2024";

    alert(`🔎 Tìm kiếm: ${query}\n Từ ngày: ${fromDate} → Đến ngày: ${toDate}`);
  };

  // Xử lý khi nhấn phím Enter
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="page-search">
        <div className="container color-search-bg rounded ">
          <div className="row">
            {/* Ô nhập từ khóa */}
            <div className="col-6 p-4">
              <input
                type="text"
                className="form-control rounded"
                placeholder="Tìm kiếm tin tức..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown} // Bắt sự kiện Enter
              />
            </div>

            {/* Chọn ngày bắt đầu */}
            <div className="col-2 p-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  ref={fromDateRef}
                  placeholder="Chọn ngày bắt đầu"
                  onKeyDown={handleKeyDown} // Bắt sự kiện Enter
                />
                <span className="input-group-text">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
              </div>
            </div>

            {/* Chọn ngày kết thúc */}
            <div className="col-2 p-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  ref={toDateRef}
                  placeholder="Chọn ngày kết thúc"
                  onKeyDown={handleKeyDown} // Bắt sự kiện Enter
                />
                <span className="input-group-text">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
              </div>
            </div>

            {/* Nút tìm kiếm */}
            <div className="col-2 p-4">
              <button className="btn btn-primary" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
