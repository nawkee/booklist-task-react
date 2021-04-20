import { createContext } from "react";

const booksData = [
  {
    id: 1,
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Second Edition",
    author: "Marijn Haverbeke",
    category: "Programming",
  },
  {
    id: 2,
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    category: "Programming",
  },
  {
    id: 3,
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    category: "Programming",
  },
];

const BooksContext = createContext(booksData);

export default BooksContext;