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
  useGetLibraryChapterNextOrderQuery,
} from "../store/libraryApi";
import styles from "./LibraryChapter.module.css";
import BackLink from "../components/ui/BackLink";
import { showToast } from "@amen24/ui";

const LibraryChapter: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [content, setContent] = useState("");

  const skip = !id || id === "create";
  const { data, isLoading } = useGetLibraryChapterQuery(id || "", { skip });

  const skipGetNextorder = !id || id !== "create";
  const { data: nextOrder } = useGetLibraryChapterNextOrderQuery(slug || '', { skip: skipGetNextorder });

  const [createChapter] = useCreateLibraryChapterMutation();
  const [updateChapter] = useUpdateLibraryChapterMutation();
  const [deleteChapter] = useDeleteLibraryChapterMutation();

  useEffect(() => {
    if (data && data.id) {
      setTitle(data.title ?? "");
      setOrder(data.order ?? 1);
      setContent(data.content ?? "");
    }
  }, [data]);

  useEffect(() => {
    if (id === "create" && nextOrder) {
      setOrder(nextOrder);
    }
  }, [id, nextOrder]);

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
      showToast("Current Chapter has been updated!")
    } else {
      await createChapter({ slug, title, order, content }).unwrap();
      showToast("New Chapter has been created!", "info")
    }

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
      <div className={styles.titleContainer}>
        <h3 className={styles.slug}>{slug}</h3>
        <BackLink to={`/library/${slug}`}></BackLink>
      </div>
      <div className={styles.header}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Chapter Title"
          onChange={handleChange.title}
          value={title ?? ""}
        />

        <Button
          type="button"
          variant="primary"
          className={styles.save}
          onClick={handleSubmit}
        >
          {id !== "create" ? "Save" : "Create"}
        </Button>
        {id !== "create" && (
          <Button
            type="button"
            variant="secondary"
            className={styles.save}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
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
