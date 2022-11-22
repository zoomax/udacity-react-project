import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import BookList from "../../SharedComponents/BookList";

function Home() {
  const { store: localBooks, setData: updateLocalBooks } =
    useLocalStorage("books");
  const [books, setBooks] = useState(localBooks ?? []);
  const setBookStatus = (id, status) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, status };
      }
      return book;
    });
    updateLocalBooks(updatedBooks);
    setBooks(updatedBooks);
  };
  const toReadBooks = useMemo(
    () => books.filter((book) => book.status === "wantToRead"),
    [books],
  );
  const currentlyReadingBooks = useMemo(
    () => books.filter((book) => book.status === "currentlyReading"),
    [books],
  );
  const readBooks = useMemo(
    () => books.filter((book) => book.status === "read"),
    [books],
  );

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookList
            books={toReadBooks}
            setBookStatus={setBookStatus}
            title={"Want to Read"}
          />
          <BookList
            books={currentlyReadingBooks}
            setBookStatus={setBookStatus}
            title={"Currently Reading"}
          />
          <BookList
            books={readBooks}
            setBookStatus={setBookStatus}
            title={"Read"}
          />
        </div>

        <div className='open-search'>
          <Link to={"/search"}>Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
