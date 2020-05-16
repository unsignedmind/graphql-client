import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../../../queries/queries';
import './add-book.component.css';
import { ReactComponent as Plus } from '../../../assets/icons/plus.svg';
import { isEmpty } from 'lodash';

function AddBookComponent(props) {
  /* Hooks */

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const [addTodo] = useMutation(addBookMutation);

  /* Functions */

  const submitForm = (e) => {
    e.preventDefault();
    if (!isEmpty(name) && !isEmpty(genre) && !isEmpty(authorId)) {
      addTodo(
        {
          variables: { name: name, genre: genre, authorId: authorId },
          refetchQueries: [{ query: getBooksQuery }],
        });
      setName('');
      setGenre('');
      setAuthorId('');
    }
  };

  const genList = ({ loading, error, data }) => {
    if (loading) return <option>Loading...</option>;
    if (error) return <option>Error :(</option>;
    if (!data) return <option>Not found</option>;

    return data.authors.map((author) => {
      return <option key={author.id} value={author.id}>{ author.name }</option>;
    });
  };

  /* Template */

  return (
    <form className="add-book" onSubmit={(e) => submitForm(e)}>
      <div className="add-book__field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="add-book__field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)}/>
      </div>
      <div className="add-book__field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          { genList(useQuery(getAuthorsQuery)) }
        </select>
      </div>
      <button>
        <Plus className="add-book__plus"/>
      </button>
    </form>
  );
};

export default AddBookComponent;
