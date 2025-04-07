import React, { useState } from "react";

interface Props {
  onSearch: (
    searchText: string,
    authorType: string,
    sortOption: string
  ) => void;
}

export default function AuthorSearch({ onSearch }: Props) {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [authorType, setAuthorType] = useState("");

  const handleSearch = () => {
    onSearch(searchText.trim(), authorType, sortOption);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="author-search">
      <div className="rounded">
        <div className="row">
          <div className="col-12 col-md-6 p-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-start"
                placeholder="Tìm kiếm tác giả theo tên..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="col-12 col-md-2 p-4">
            <select
              className="form-select"
              value={authorType}
              onChange={(e) => setAuthorType(e.target.value)}
            >
              <option value="">Tất cả </option>
              <option value="POET">Nhà thơ</option>
              <option value="WRITER">Nhà văn</option>
            </select>
          </div>

          <div className="col-12 col-md-2 p-4">
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="asc">Sắp xếp A → Z</option>
              <option value="desc">Sắp xếp Z → A</option>
            </select>
          </div>

          <div className="col-2 p-4 text-center">
            <button className="btn btn-primary" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
