import React, { useState } from "react";
import { useApiCall } from "../../hooks/useApiCall";
import { searchBooks as searchBooksApi } from "../../api/BooksAPI";
import BookList from "../../SharedComponents/BookList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
export const Search = () => {
  const [books, setBooks] = useState([]);
  const { store: localBooks, setData: updataLocalBooks } =
    useLocalStorage("books");
  const [searchBooks] = useApiCall(searchBooksApi, (res) => {
    const data = res.books.map(
      ({ title, imageLinks: { thumbnail }, authors, id }) => ({
        name: title,
        imageUrl: thumbnail,
        author: authors.join(", "),
        status: "none",
        id,
      }),
    );
    setBooks(data);
  });

  const setBookStatus = (id, status) => {
    const selectedLocalBookIndex = (localBooks ? localBooks : []).findIndex(
      (book) => book.id === id,
    );
    const selectedSearchBookIndex = books.findIndex((book) => book.id === id);
    const isInLocalBooks = selectedLocalBookIndex > -1 ? true : false;
    const localBooksClone = [...(localBooks ?? [])];
    if (isInLocalBooks) {
      localBooksClone[selectedLocalBookIndex] = {
        ...localBooks[selectedLocalBookIndex],
        status,
      };
    } else {
      books[selectedSearchBookIndex] = {
        ...books[selectedSearchBookIndex],
        status,
      };
      setBooks([...books]);
      localBooksClone.push({
        ...books[selectedSearchBookIndex],
        status,
      });
    }
    updataLocalBooks(localBooksClone);
  };

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title, author, or ISBN'
            onChange={(e) => {
              console.log(e.target.value);
              searchBooks({ body: { query: e.target.value, maxResults: 10 } });
            }}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <BookList books={books} title='' setBookStatus={setBookStatus} />
      </div>
    </div>
  );
};

export default Search;
