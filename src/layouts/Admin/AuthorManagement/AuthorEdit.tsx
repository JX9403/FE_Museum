import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorById, updateAuthor } from "../../../api/AuthorAPI"; // Thêm API lấy và cập nhật tác giả
import { Author } from "../../../model/AuthorModel";
import { Section } from "../../../model/Section";
import { Image } from "../../../model/ImageModel";

export const AuthorEdit = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  // State cho các trường dữ liệu
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [birthYear, setBirthYear] = useState<number | undefined>();
  const [deathYear, setDeathYear] = useState<number | undefined>();
  const [type, setType] = useState<"POET" | "WRITER">("POET");
  const [award, setAward] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState<
    "success" | "danger" | "info" | "warning"
  >("success");

  // Hàm để gọi API lấy thông tin tác giả
  const fetchAuthor = async (authorId: string) => {
    try {
      const author = await getAuthorById(authorId);
      // giả sử response trả về `data` là đối tượng tác giả
      console.log("author by id : ", author);

      // Gán giá trị từ API vào state
      setName(author.name);
      setCareer(author.career);
      setBirthYear(author.birthYear);
      setDeathYear(author.deathYear);
      setType(author.type);
      setAward(author.listAchievements?.[0]?.id || null);

      // Chuyển biographical sections thành sections (có thể tùy chỉnh)
      const bioSections = parseHTMLToSections(author.biography);
      setSections(bioSections);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu tác giả:", err);
      alert("Không thể tải dữ liệu tác giả.");
    }
  };

  // Hàm để cập nhật thông tin trong một section
  const updateSection = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  // Hàm để xóa một section
  const removeSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", content: "", imageUrl: "", imageDescription: "" },
    ]);
  };

  // Hàm chuyển HTML thành sections
  const parseHTMLToSections = (biography: string): Section[] => {
    // Dùng thư viện html-react-parser để chuyển HTML thành các sections
    const parser = new DOMParser();
    const doc = parser.parseFromString(biography, "text/html");

    const sections: Section[] = [];
    const sectionElements = doc.querySelectorAll(".section");

    sectionElements.forEach((sectionElement) => {
      const titleElement = sectionElement.querySelector("h4");
      const contentElement = sectionElement.querySelector(".section-content");
      const imageElement = sectionElement.querySelector(".image");
      const imageUrl = imageElement
        ? imageElement.querySelector("img")?.getAttribute("src") || ""
        : "";
      const imageDescription = imageElement
        ? imageElement.querySelector(".img-desc")?.textContent || ""
        : "";

      sections.push({
        title: titleElement ? titleElement.textContent || "" : "",
        content: contentElement ? contentElement.innerHTML : "",
        imageUrl,
        imageDescription,
      });
    });

    return sections;
  };

  // Hàm xử lý gửi dữ liệu sửa tác giả
  const handleSubmit = async () => {
    const htmlSections = sections
      .map((sec) => {
        const imageBlock = sec.imageUrl.trim()
          ? `
            <div class="image">
              <div class="img-author">
                <img src="${sec.imageUrl}" alt="${
              sec.imageDescription || "preview"
            }" />
              </div>
              <div class="img-desc">${sec.imageDescription || ""}</div>
            </div>`
          : "";

        return `
          <div class="section">
            <h4>${sec.title}</h4>
            ${imageBlock}
            <div class="section-content">${sec.content}</div>
          </div>
        `;
      })
      .join("\n");

    const biographyHTML = `<div class="biography">${htmlSections}</div>`;

    const imageList: Image[] = sections
      .filter((sec) => sec.imageUrl.trim() !== "")
      .map((sec) => ({
        url: sec.imageUrl,
        description: sec.imageDescription || "preview",
      }));

    const payload: Author = {
      id: Number(id),
      name,
      birthYear: birthYear ?? 0,
      deathYear: deathYear ?? 0,
      career,
      biography: biographyHTML,
      type,
      listImages: imageList.length > 0 ? imageList : undefined,
      listAchievements: award ? [{ id: award }] : undefined,
    };

    try {
      const res = await updateAuthor(payload); // Cập nhật tác giả qua API
      console.log("✅ Phản hồi từ server:", res);
      setToastBg("success");
      setToastMessage("Sửa tác giả thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/admin/authors/edit/${id}`);
      }, 2000);
    } catch (err: any) {
      console.error("❌ Lỗi khi cập nhật tác giả:", err.message);
      setToastBg("danger");
      setToastMessage(err.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchAuthor(id);
    }
  }, [id]);

  return (
    <div className="container py-4">
      <div className="top-title d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Chỉnh sửa tác giả</h4>
        <button
          className="btn btn-light"
          onClick={() => navigate("/admin/authors")}
        >
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tên tác giả</label>
        <input
          type="text"
          className="form-control"
          placeholder="Tên tác giả"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Năm sinh</label>
          <input
            type="number"
            className="form-control"
            value={birthYear ?? ""}
            placeholder="Năm sinh"
            onChange={(e) => setBirthYear(Number(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Năm mất</label>
          <input
            type="number"
            className="form-control"
            value={deathYear ?? ""}
            placeholder="Năm mất"
            onChange={(e) => setDeathYear(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Loại hình tác giả</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value as "POET" | "WRITER")}
          >
            <option value="POET">Nhà thơ</option>
            <option value="WRITER">Nhà văn</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Giải thưởng</label>
          <select
            className="form-select"
            value={award ?? ""}
            onChange={(e) => setAward(Number(e.target.value))}
          >
            <option value="">-- Chọn giải thưởng --</option>
            <option value="2">Giải thưởng Hồ Chí Minh</option>
            <option value="1">Giải thưởng Nhà nước</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Giới thiệu ngắn</label>
        <textarea
          className="form-control"
          placeholder="Giới thiệu ngắn"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        />
      </div>

      <hr />

      {sections.map((section, index) => (
        <div key={index} className="mb-4 border rounded p-3">
          <div className="mb-3">
            <label className="form-label">Tiêu đề đoạn văn</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tiêu đề đoạn văn"
              value={section.title}
              onChange={(e) => updateSection(index, "title", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nội dung</label>
            <ReactQuill
              value={section.content}
              onChange={(value) => updateSection(index, "content", value)}
              theme="snow"
              placeholder="Nội dung section..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Link ảnh (URL)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Link ảnh"
              value={section.imageUrl}
              onChange={(e) => updateSection(index, "imageUrl", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả ảnh</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mô tả ảnh"
              value={section.imageDescription}
              onChange={(e) =>
                updateSection(index, "imageDescription", e.target.value)
              }
            />
          </div>

          {section.imageUrl && (
            <div className="image">
              <div className="img-author">
                <img src={section.imageUrl} alt="preview" />
              </div>
              <div className="img-desc">{section.imageDescription}</div>
            </div>
          )}

          <button
            className="btn btn-danger mt-2"
            onClick={() => removeSection(index)}
          >
            Xóa section
          </button>
        </div>
      ))}

      <button onClick={addSection} className="btn btn-secondary me-2">
        Thêm đoạn mới
      </button>
      <button onClick={handleSubmit} className="btn btn-primary">
        Lưu dữ liệu
      </button>

      <div
        className={`toast position-fixed top-0 end-0 m-3 text-white bg-${toastBg} show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          zIndex: 9999,
          display: showToast ? "block" : "none",
          minWidth: "250px",
        }}
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default AuthorEdit;
