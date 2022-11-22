import React from "react";
import PropTypes from "prop-types";
import BookCard from "../BookCard";
function BookList({ books, setBookStatus, title }) {
  const handleStatusChange = (id) => {
    return (e) => setBookStatus(id, e.target.value);
  };
  return (
    <div className='bookshelf'>
      {title ? <h2 className='bookshelf-title'>{title}</h2> : <></>}
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              setBookStatus={handleStatusChange}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
BookList.propTypes = {
  books: PropTypes.array.isRequired,
  setBookStatus: PropTypes.func.isRequired,
  title: PropTypes.string,
};
export default BookList;
