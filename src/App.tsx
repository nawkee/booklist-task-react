import "./App.scss";
import { Route, Switch, useHistory } from "react-router";
import { ReactElement, useEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import EditPage from "./components/EditPage/EditPage";
import { Book } from "./types/types";

function App(): ReactElement {
  const [books, setBooks] = useState<any>([]);
  const [bookToEdit, setBookToEdit] = useState<any>({});

  const history = useHistory();

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books/");
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openEdit = (id: number) => {
    if (id === 0) {
      setBookToEdit({});
    } else {
      setBookToEdit(books.find((book: Book) => book.id === id));
    }

    history.push("/edit");
  };

  const addBook = async (book: Book) => {
    try {
      const response = await fetch(`http://localhost:3000/books`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      // const data = await response.json();
      // setBooks([...books, data]);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }

    history.push("/");
  };

  const deleteBook = async (id: number = 0) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "delete",
      });
      // const data = await response.json();
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const editBook = async (book: Book) => {
    try {
      await deleteBook(book.id);
      await addBook(book);
    } catch (error) {
      console.log(error);
    }

    history.push("/");
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Dashboard
              books={books}
              deleteBook={deleteBook}
              openEdit={openEdit}
            />
          )}
        />
        <Route
          exact
          path="/edit"
          render={() => (
            <EditPage book={bookToEdit} addBook={addBook} editBook={editBook} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
