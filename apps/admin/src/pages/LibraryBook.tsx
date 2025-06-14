import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./LibraryBook.module.css";
import LibraryChapterList from "../components/Library/LibraryChapterList";
import {
  useDeleteLibraryBookMutation,
  useGetLibraryBookQuery,
  useUpdateLibraryBookMutation,
} from "../store/libraryApi";
import Button from "../components/ui/Button";
import BackLink from "../components/ui/BackLink";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { ApprovalStatus, BookCategory, Church, Denomination } from "@amen24/shared";
import { showToast } from "@amen24/ui";
import { FaRegEdit } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

const LibraryBook: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const navigate = useNavigate();

  const skip = !slug;
  const { data } = useGetLibraryBookQuery(slug || "", { skip });
  const [deleteBook] = useDeleteLibraryBookMutation();
  const [updateBook] = useUpdateLibraryBookMutation();

  const [bookUpdateMode, setBookUpdateMode] = useState<boolean>(false);

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [bookSlug, setBookSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [denomination, setDenomination] = useState("");
  const [church, setChurch] = useState("");

  // Populate form fields when data is fetched
  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setBookSlug(data.slug ?? "");
      setAuthor(data.author ?? "");
      setYear(data.year.toString() ?? "");
      setCategory(data.category ?? "");
      setDenomination(data.denomination ?? "");
      setChurch(data.church ?? "");
    }
  }, [data]);

  async function handleDelete() {
    if (!data?.id) return;
    await deleteBook(data.id).unwrap();
    navigate(`/library`);
  }

  async function handleSave() {
    if (!data?.id) return;

    let approvalStatus = data.approvalStatus;

    if (data.approvalStatus === ApprovalStatus.Rejected) {
      approvalStatus = ApprovalStatus.Pending;
    }

    await updateBook({
      id: data.id,
      title,
      slug: bookSlug,
      author,
      year: +year,
      category: category as BookCategory,
      denomination: denomination as Denomination,
      church: church as Church,
      approvalStatus,
    }).unwrap();

    showToast("Library book data has been updated!");
  }

  async function handleApprove() {
    if (!data?.id) return;

    await updateBook({
      id: data.id,
      approvalStatus: ApprovalStatus.Approved
    }).unwrap();

    showToast("Library book data has been approved!");
  }

  async function handleReject() {
    if (!data?.id) return;

    await updateBook({
      id: data.id,
      approvalStatus: ApprovalStatus.Rejected
    }).unwrap();

    showToast("Library book data has been rejected!");
  }

  if (!slug) return null;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{slug}</h3>
          <Button className={styles.editModeToggler} onClick={() => setBookUpdateMode(prev => !prev)}>
            {bookUpdateMode ? <RiCloseLargeLine /> : <FaRegEdit />}
          </Button>
          <BackLink to={`/library`} />
        </div>
        <Link className={styles.createChapterLink} to={`/library/${slug}/create`}>
          ➕ Add New Chapter
        </Link>
        <Button variant="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {bookUpdateMode && (
        <div className={`${styles.form} ${!bookUpdateMode ? styles.collapsed : ""}`}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Slug" value={bookSlug} onChange={(e) => setBookSlug(e.target.value)} />
          <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={Object.entries(BookCategory).map(([key, value]) => ({ label: key, value }))}
          />
          <Select
            label="Denomination"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            options={Object.entries(Denomination).map(([key, value]) => ({ label: key, value }))}
          />
          <Select
            label="Church"
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            options={Object.entries(Church).map(([key, value]) => ({ label: key, value }))}
          />

          <div className={styles.actions}>
            <Button onClick={handleSave}>Save Changes</Button>
            {
              data?.approvalStatus === ApprovalStatus.Pending && (
                <>
                  <Button variant="accent" onClick={handleApprove}>Approve</Button>
                  <Button variant="danger" onClick={handleReject}>Reject</Button>
                </>
              )
            }
          </div>

        </div>
      )}

      <LibraryChapterList slug={slug} />
    </div>
  );
};

export default LibraryBook;
