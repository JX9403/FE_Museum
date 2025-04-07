import { Author } from "../model/AuthorModel";
import http from "../utils/http";

// Tạo mới tác giả
export const createAuthor = async (authorData: Author) => {
  try {
    const res = await http.post("/api/authors", authorData);
    return res.data;
  } catch (err: any) {
    console.error("Lỗi khi tạo tác giả:", err.response.data);
    throw err.response.data;
  }
};

// Lấy thông tin tác giả theo ID
export const getAuthorById = async (id: string) => {
  try {
    const res = await http.get(`/api/authors/${id}`);
    return res.data; // Giả sử API trả về thông tin tác giả trong trường `data`
  } catch (err: any) {
    console.error("Lỗi khi get tác giả:", err.response.data);
    throw err.response.data;
  }
};
//Lay toan bo tac gia

export const getAllAuthors = async (
  page: number,
  size: number,
  searchText: string,
  authorType: string,
  sortOption: string
) => {
  try {
    const res = await http.get(
      `/api/authors?page=${page}&size=${size}&name=${searchText}&type=${authorType}&sort=${sortOption}`
    );
    return res.data; // Giả sử API trả về thông tin tác giả trong trường `data`
  } catch (err: any) {
    console.error("Lỗi khi get tác giả:", err.response.data);
    throw err.response.data;
  }
};

// Cập nhật thông tin tác giả
export const updateAuthor = async (authorData: Author) => {
  try {
    const res = await http.put(`/api/authors/${authorData.id}`, authorData);
    return res.data; // Trả về dữ liệu cập nhật từ server
  } catch (err: any) {
    console.error("Lỗi khi cập nhật tác giả:", err.response.data);
    throw err.response.data;
  }
};

export const deleteAuthor = async (id: number) => {
  try {
    const res = await http.delete(`/api/authors/${id}`);
    return res.data; // Trả về dữ liệu cập nhật từ server
  } catch (err: any) {
    console.error("Lỗi khi xóa tác giả:", err.response.data);
    throw err.response.data;
  }
};
