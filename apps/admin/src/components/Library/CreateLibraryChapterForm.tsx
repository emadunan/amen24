import React, { ChangeEvent, useState } from "react";
import styles from "./CreateLibraryChapterForm.module.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Button from "../ui/Button";

const CreateLibraryChapterForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [content, setContent] = useState("");

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    setContent(e.target.value);
  }

  return (
    <div>
      <div className={styles.header}>
        <input
          type="number"
          className={styles.orderInput}
          placeholder="Order"
        />
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Chapter Title"
        />
        <Button type="button" variant="primary" className={styles.save}>Save</Button>
      </div>
      <div className={styles.content} dir="rtl">
        <textarea onChange={handleContentChange} value={content} />
        <div className={styles.markdownContainer}>
          <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default CreateLibraryChapterForm;
