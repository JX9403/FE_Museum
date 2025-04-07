import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../api/AuthorAPI";
import { Author } from "../../../model/AuthorModel";
import { Section } from "../../../model/Section";
import { Image } from "../../../model/ImageModel";

export const AuthorCreate = () => {
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [birthYear, setBirthYear] = useState<number | undefined>();
  const [deathYear, setDeathYear] = useState<number | undefined>();
  const [type, setType] = useState<"POET" | "WRITER">("POET");
  const [award, setAward] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const navigate = useNavigate();

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", content: "", imageUrl: "", imageDescription: "" },
    ]);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const updateSection = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

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
      console.log("📦 Payload gửi đi:", payload);
      const res = await createAuthor(payload);
      console.log("✅ Phản hồi từ server:", res);
      alert("Thêm tác giả thành công!");
      // navigate(-1);
    } catch (err) {
      console.error("❌ Lỗi khi tạo tác giả:", err);
      alert("Có lỗi xảy ra, kiểm tra console để biết chi tiết.");
    }
  };

  return (
    <div className="container py-4">
      <div className="top-title d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới tác giả</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
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
        Gửi dữ liệu
      </button>
    </div>
  );
};

export default AuthorCreate;
