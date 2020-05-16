import React from 'react';
import BookListComponent from '../book/book-list/book-list.component';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import AddBookComponent from '../book/add-book/add-book.component';
import './app.component.css';


const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const apolloClient = new ApolloClient({ cache, link });

function AppComponent() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="main">
        <h1>Book List Application</h1>
        <BookListComponent/>
        <AddBookComponent/>
      </div>
    </ApolloProvider>
  );
}

export default AppComponent;
