import React from "react";
import "./Dashboard.scss";
import { Book } from "../../types/types";

interface CustomProps {
  books: [Book];
  deleteBook: (id: number) => void;
  openEdit: (id: number) => void;
}

const Dashboard: React.FC<CustomProps> = (props) => {
  const { books, deleteBook, openEdit } = props;

  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author`s name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id || 0}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
              <td className="buttons">
                <button
                  className="btn edit-btn"
                  onClick={() => openEdit(book.id || 0)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteBook(book.id || 0)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn add-book" onClick={() => openEdit(0)}>
        Add a Book
      </button>
    </div>
  );
};

export default Dashboard;
