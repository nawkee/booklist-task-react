import React, { useState } from "react";
import "./EditPage.scss";
import { useHistory } from "react-router";
import { Book } from "../../types/types";

interface CustomProps {
  book: Book;
  editBook: (data: Book) => void;
  addBook: (data: Book) => void;
}

const EditPage: React.FC<CustomProps> = (props) => {
  const { book, editBook, addBook } = props;

  const history = useHistory();

  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [category, setCategory] = useState(book.category || "Programming");

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    isbn: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let validationErrors = {
      title: false,
      author: false,
      isbn: false,
    };

    if (!title) validationErrors = { ...validationErrors, title: true };
    if (!author) validationErrors = { ...validationErrors, author: true };
    if (!isbn) validationErrors = { ...validationErrors, isbn: true };

    setErrors(validationErrors);

    if (
      !validationErrors.author &&
      !validationErrors.title &&
      !validationErrors.isbn
    ) {
      book.title
        ? editBook({ id: book.id, title, author, isbn, category })
        : addBook({
            title,
            author,
            isbn,
            category,
          });
    }
  };

  return (
    <div className="edit-page">
      <h2 className="title">{book.title ? "Edit the Book" : "Add a Book"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            className={`input ${errors.title ? "error" : ""}`}
            type="text"
            value={title}
            onChange={(e) => {
              setErrors({ ...errors, title: false });
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Author:
          <input
            className={`input ${errors.author ? "error" : ""}`}
            type="text"
            value={author}
            onChange={(e) => {
              setErrors({ ...errors, author: false });
              setAuthor(e.target.value);
            }}
          />
        </label>
        <label>
          ISBN:
          <input
            className={`input ${errors.isbn ? "error" : ""}`}
            type="text"
            value={isbn}
            onChange={(e) => {
              setErrors({ ...errors, isbn: false });
              setIsbn(e.target.value);
            }}
          />
        </label>
        <label>
          Category:
          <select
            className="input select"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Programming">Programming</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science">Science</option>
            <option value="Horror">Horror</option>
          </select>
        </label>
        <div className="btn-container">
          <input
            type="submit"
            className="btn edit-add-btn"
            value={book.title ? "Edit" : "Add"}
          />
          <button className="btn return-btn" onClick={() => history.push("/")}>
            Return
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
