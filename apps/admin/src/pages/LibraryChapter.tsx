import React, { ChangeEvent, useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import {
  useGetLibraryChapterQuery,
  useCreateLibraryChapterMutation,
  useUpdateLibraryChapterMutation,
} from "../store/libraryApi";
import styles from "./LibraryChapter.module.css";

const LibraryChapter: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [content, setContent] = useState("");

  const skip = !id || id === "create";
  const { data, isLoading } = useGetLibraryChapterQuery(id || "", { skip });

  const [createChapter] = useCreateLibraryChapterMutation();
  const [updateLibraryChapter] = useUpdateLibraryChapterMutation();

  useEffect(() => {
    if (data && data.id) {
      console.log("Fetched chapter:", data); // 🕵️‍♂️

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
      console.log("UPDATE", id);
      console.log(id, title, order, content);

      try {
        const res = await updateLibraryChapter({
          id,
          title,
          order,
          content,
        }).unwrap();
        console.log("✅ Success", res);
      } catch (err) {
        console.error("❌ Mutation failed", err);
      }
    } else {
      console.log("CREATE", id);
      await createChapter({ slug, title, order, content }).unwrap();
    }
  };

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
