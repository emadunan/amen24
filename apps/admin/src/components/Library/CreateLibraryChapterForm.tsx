import React, { ChangeEvent, useState } from "react";
import styles from "./CreateLibraryChapterForm.module.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Button from "../ui/Button";
import { useCreateLibraryChapterMutation } from "../../store/libraryApi";

interface Props {
  slug: string;
  onToggle: () => void;
}

const CreateLibraryChapterForm: React.FC<Props> = ({ slug, onToggle }) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [content, setContent] = useState("");

  const [createChapter] = useCreateLibraryChapterMutation();

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setContent(e.target.value);
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleOrderChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setOrder(+e.target.value);
  }

  async function onSave() {
    await createChapter({
      slug,
      title,
      order,
      content,
    }).unwrap();
    onToggle();
  }

  return (
    <div>
      <div className={styles.header}>
        <input
          type="number"
          className={styles.orderInput}
          placeholder="Order"
          onChange={handleOrderChange}
          value={order}
        />
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Chapter Title"
          onChange={handleTitleChange}
          value={title}
        />
        <Button
          type="button"
          variant="primary"
          className={styles.save}
          onClick={onSave}
        >
          Save
        </Button>
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
