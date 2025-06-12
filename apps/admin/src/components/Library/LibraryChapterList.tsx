import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import styles from "./LibraryChapterList.module.css";
import { useSensor, useSensors, PointerSensor, DndContext } from "@dnd-kit/core";
import { useChangeLibraryChapterOrderMutation, useGetLibraryBookQuery } from "../../store/libraryApi";
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

interface Props {
  slug: string;
}

interface ChapterItemProps {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ id, title, isSelected, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`${styles.chapterItem} ${isSelected ? styles.active : ""}`}
      onClick={(e) => {
        // Prevent firing when clicking the drag handle
        if (!(e.target as HTMLElement).closest(`.${styles.dragHandle}`)) {
          onClick();
        }
      }}
    >
      <span className={styles.dragHandle} {...attributes} {...listeners}>
        ⠿
      </span>
      {title}
    </li>
  );
};



const LibraryChapterList: React.FC<Props> = ({ slug }) => {
  const { data } = useGetLibraryBookQuery(slug);
  const [changeOrder] = useChangeLibraryChapterOrderMutation();

  const [selected, setSelected] = useState<string | undefined>(
    data?.chapters.find((ch) => ch.order === 1)?.id,
  );

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (data?.chapters) {
      setItems(data.chapters.map((ch) => ch.id));
    }
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    const movedChapter = data?.chapters.find((ch) => ch.id === active.id);
    const targetChapter = data?.chapters.find((ch) => ch.id === over.id);

    if (movedChapter && targetChapter) {
      await changeOrder({
        slug,
        body: {
          chapterOrder: movedChapter.order,
          targetOrder: targetChapter.order,
        },
      });
    }
  };

  const sortedChapters = items
    .map((id) => data?.chapters.find((ch) => ch.id === id))
    .filter(Boolean);

  const selectedChapter = data?.chapters.find((ch) => ch.id === selected);

  return (
    <div className={styles.container} dir="rtl">
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarHeading}>Chapters</h3>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className={styles.chapterList}>
              {sortedChapters.map((ch) => (
                <ChapterItem
                  key={ch!.id}
                  id={ch!.id}
                  title={ch!.title}
                  isSelected={selected === ch!.id}
                  onClick={() => {
                    console.log("Clicked");

                    setSelected(ch!.id)
                  }}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </aside>

      <main className={styles.content}>
        {selected && (
          <Link to={`/library/${slug}/${selected}`} className={styles.editBtn}>
            Edit
          </Link>
        )}
        <article className={styles.chapterBody}>
          <Markdown>{selectedChapter?.content}</Markdown>
        </article>
      </main>
    </div>
  );
};

export default LibraryChapterList;
