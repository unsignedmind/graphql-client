import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../../../../queries/queries';
import './book-detail.component.css';

/**
 * Renders the detail view of a book including the author
 * @return {*}
 * @constructor
 */
function BookDetailComponent(props) {
  /* Hooks */
  const book = useQuery(getBookQuery, { variables: {
    id: props.bookId,
  } });

  /* Functions */
  const genBookView = ({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <></>;
    if (!data) return <p>Book not found</p>;
    return (
      <div className="book-detail">
        <h2>{data.book.name}</h2>
        <p>Genre: {data.book.genre}</p>
        <p>Author: {data.book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {
            data.book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })
          }
        </ul>
      </div>
    );
  };

  /* Template */
  return (
    <div id="book-details">
      {genBookView(book)}
    </div>
  );
}

export default BookDetailComponent;
