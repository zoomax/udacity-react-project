import React from "react";
import PropTypes from "prop-types";
import CustomSelect from "../Forms/CustomSelect";
import { StatusOptions } from "../../constants";
function BookCard({
  book: { id, name, author, status, imageUrl },
  setBookStatus,
}) {
  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${imageUrl})`,
            }}></div>
          <CustomSelect
            initialValue={status}
            options={StatusOptions}
            onChange={setBookStatus(id)}
          />
        </div>
        <div className='book-title'>{name}</div>
        <div className='book-authors'>{author}</div>
      </div>
    </li>
  );
}
BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  setBookStatus: PropTypes.func.isRequired,
};
export default BookCard;
