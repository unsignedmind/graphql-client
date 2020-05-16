import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { getBooksQuery } from '../../../queries/queries';
import BookDetailComponent from './book-detail/book-detail.component';
import './book-list.component.css';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow-right.svg';


function BookListComponent(props) {
  /* Hooks */
  const [selectedBookId, setSelectedBookId] = useState('');

  /* Functions */

  const genList = ({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data) return <p>Not found</p>;

    return data.books.map((book) => {
      return <li className="book-list__entry" key={book.id} onClick={ () => setSelectedBookId(book.id) }>
        <div className="book-list__entry-details">
          <h3>{ book.name }</h3>
          <span>-</span>
          <p>{book.genre}</p>
        </div>
        <div className="book-list__entry-arrow">
          <Arrow/>
        </div>
      </li>;
    });
  };

  /* Template */

  return (
    <div className="book-list-wrapper">
      <ul className="book-list">
        {genList(useQuery(getBooksQuery))}
      </ul>
      <BookDetailComponent bookId={selectedBookId}/>
    </div>
  );
};

export default BookListComponent;
