import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';

class BooksApp extends React.Component {
  state = {
      books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books: books})
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookShelf
              bookList={books.filter(book => book.shelf === "currentlyReading")}
              name="Currently Reading"
            />

            <BookShelf
              bookList={books.filter(book => book.shelf === "wantToRead")}
              name="Want To Read"
            />

            <BookShelf
              bookList={books.filter(book => book.shelf === "read")}
              name="Read"
            />

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={()=>(
          <SearchPage />
        )} />

      </div>
    )
  }
}

export default BooksApp
