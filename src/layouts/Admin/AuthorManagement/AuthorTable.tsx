import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthorSearch from "./AuthorSearch";
import { Pagi } from "../../../components/Pagi/Pagi";
import { deleteAuthor, getAllAuthors } from "../../../api/AuthorAPI";

export default function AuthorTable() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    authorType: "",
    sortOption: "asc",
  });
  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchParams]);

  const fetchAuthors = async () => {
    try {
      const data = await getAllAuthors(
        currentPage,
        pageSize,
        searchParams.searchText,
        searchParams.authorType,
        searchParams.sortOption
      );
      setAuthors(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tác giả:", error);
    }
  };

  const handleSearch = (
    searchText: string,
    authorType: string,
    sortOption: string
  ) => {
    setCurrentPage(0); // reset về trang đầu
    setSearchParams({ searchText, authorType, sortOption });
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/authors/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setAuthorToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteAuthor(id);
      setAuthors(authors.filter((author) => author.id !== id));
      console.log(`Đã xóa tác giả ID ${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa tác giả:", error);
    }
    setShowModal(false);
    setAuthorToDelete(null);
  };

  const pagi = (current: number) => {
    setCurrentPage(current);
  };

  return (
    <>
      <div className="manage-author-table">
        <AuthorSearch onSearch={handleSearch} />
        <div
          className="btn btn-primary"
          onClick={() => navigate("/admin/authors/create")}
        >
          Thêm mới
        </div>

        <div className="container mt-4">
          <h2 className="mb-4">Danh sách Tác giả</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Năm sinh</th>
                <th scope="col">Năm mất</th>
                <th scope="col">Loại hình tác giả</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <th scope="row">
                    <NavLink to={`/authors/${author.id}`}>{author.id}</NavLink>
                  </th>
                  <td>{author.name}</td>
                  <td>{author.birthYear}</td>
                  <td>{author.deathYear}</td>
                  <td>{author.type === "POET" ? "Nhà thơ" : "Nhà văn"}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(author.id)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(author.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagi current={currentPage + 1} totalPages={totalPages} pagi={pagi} />
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show fade d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận xóa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn xóa tác giả ID {authorToDelete}?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(authorToDelete!)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
