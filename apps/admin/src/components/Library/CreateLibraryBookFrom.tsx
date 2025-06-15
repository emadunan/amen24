import {
  ApprovalStatus,
  BookCategory,
  Denomination,
  Lang,
} from "@amen24/shared";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateLibraryBookFrom.module.css";
import { useCreateLibraryBookMutation } from "../../store/libraryApi";
import { showToast } from "@amen24/ui";

interface Props {
  onToggleMode: () => void;
}

const CreateLibraryBookForm: React.FC<Props> = ({ onToggleMode }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    denomination: "",
    lang: "en",
    year: "",
    approvalStatus: ApprovalStatus.Pending,
    cover: null as File | null,
  });

  const [createBook] = useCreateLibraryBookMutation();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, cover: file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("denomination", form.denomination);
    formData.append("lang", form.lang);
    formData.append("approvalStatus", form.approvalStatus);

    if (form.year.trim()) {
      formData.append("year", form.year);
    }

    if (form.cover) {
      formData.append("cover", form.cover);
    }

    try {
      await createBook(formData).unwrap();
      showToast("Book has been created successfully");
    } catch (error) {
      showToast("Failed to create book, check input data and attached cover photo", "error");
    }

    onToggleMode();
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Create New Book</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Title"
      />

      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {Object.entries(BookCategory).map(([key, val]) => (
          <option key={key} value={val}>
            {key.replace(/([A-Z])/g, " $1").trim()}
          </option>
        ))}
      </select>

      <select
        name="denomination"
        value={form.denomination}
        onChange={handleChange}
        required
      >
        <option value="">Select Denomination</option>
        {Object.entries(Denomination).map(([key, val]) => (
          <option key={key} value={val}>
            {key.replace(/([A-Z])/g, " $1").trim()}
          </option>
        ))}
      </select>

      <select name="lang" value={form.lang} onChange={handleChange} required>
        <option value="">Select Language</option>
        {Object.entries(Lang).map(([key, val]) => (
          <option key={key} value={val}>
            {key}
          </option>
        ))}
      </select>

      <input
        name="year"
        type="number"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        className={styles.fileInput}
      />

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className={styles.preview} />
      )}

      <button type="submit" className={styles.submit}>
        Create
      </button>
    </form>
  );
};

export default CreateLibraryBookForm;
