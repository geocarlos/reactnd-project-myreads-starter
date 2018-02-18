import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './components/book_shelf';
import SearchPage from './components/search_page';

class BooksApp extends React.Component {
  state = {
      books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books: books})
    });
  }

  render() {
    console.log(this.state.books)

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookShelf
              bookList={this.state.books.filter(book => book.shelf === "currentlyReading")}
              name="Currently Reading"
            />

            <BookShelf
              bookList={this.state.books.filter(book => book.shelf === "wantToRead")}
              name="Want To Read"
            />

            <BookShelf
              bookList={this.state.books.filter(book => book.shelf === "read")}
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
