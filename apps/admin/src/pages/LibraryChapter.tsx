import React, { ChangeEvent, useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import {
  useGetLibraryChapterQuery,
  useCreateLibraryChapterMutation,
  useUpdateLibraryChapterMutation,
  useDeleteLibraryChapterMutation,
} from "../store/libraryApi";
import styles from "./LibraryChapter.module.css";
import { showToast } from "@amen24/ui";

const LibraryChapter: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [content, setContent] = useState("");

  const skip = !id || id === "create";
  const { data, isLoading } = useGetLibraryChapterQuery(id || "", { skip });

  const [createChapter] = useCreateLibraryChapterMutation();
  const [updateChapter] = useUpdateLibraryChapterMutation();
  const [deleteChapter] = useDeleteLibraryChapterMutation();

  useEffect(() => {
    showToast("Test toast")
  }, [])

  useEffect(() => {
    if (data && data.id) {
      setTitle(data.title ?? "");
      setOrder(data.order ?? 1);
      setContent(data.content ?? "");
    }
  }, [data]);

  const handleChange = {
    title: (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    order: (e: ChangeEvent<HTMLInputElement>) => setOrder(+e.target.value),
    content: (e: ChangeEvent<HTMLTextAreaElement>) =>
      setContent(e.target.value),
  };

  const handleSubmit = async () => {
    if (!slug || !title.trim() || !content.trim() || order <= 0) return;

    if (id && id !== "create") {
      await updateChapter({ id, title, order, content }).unwrap();
    } else {
      await createChapter({ slug, title, order, content }).unwrap();
    }

    showToast("New Chapter has been created!")
    navigate(`/library/${slug}`);
  };

  async function handleDelete() {
    if (!id || id === "create") return;

    try {
      await deleteChapter(id).unwrap();
      showToast("Chapter has been deleted");
      navigate(`/library/${slug}`);
    } catch (err) {
      console.error("❌ Failed to delete chapter", err);
    }
  }

  if (id && isLoading) return <p>Loading chapter...</p>;

  return (
    <div>
      <h2 className={styles.slug}>{slug}</h2>
      <div className={styles.header}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Chapter Title"
          onChange={handleChange.title}
          value={title ?? ""}
        />
        <input
          type="number"
          className={styles.orderInput}
          placeholder="Order"
          onChange={handleChange.order}
          value={order}
          min={order ?? 1}
        />
        <Button
          type="button"
          variant="primary"
          className={styles.save}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={styles.save}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>

      <div className={styles.content} dir="rtl">
        <textarea
          onChange={handleChange.content}
          value={content}
          className={styles.editor}
          placeholder="Write markdown content here..."
        />
        <div className={styles.markdownContainer}>
          <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default LibraryChapter;
