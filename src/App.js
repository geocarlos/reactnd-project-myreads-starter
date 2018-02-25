import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';

class BooksApp extends React.Component {
  state = {
      books: [],
      searchResults: []
  }

  componentDidMount(){
    this.updateBookList();
  }

  updateBookList(){
    BooksAPI.getAll().then(books =>{
      this.setState({books: books})
    });
  }

  updateBook = (book, shelf)=>{
      BooksAPI.update(book, shelf);
      this.updateBookList();
  }

  updateSearchResults(results){
    this.setState({searchResults: results});
  }

  clearSearchResults(){
    this.setState({searchResults: []})
  }

  render() {
    const { books, searchResults } = this.state;

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
              onUpdate={this.updateBook}
            />

            <BookShelf
              bookList={books.filter(book => book.shelf === "wantToRead")}
              name="Want To Read"
              onUpdate={this.updateBook}
            />

            <BookShelf
              bookList={books.filter(book => book.shelf === "read")}
              name="Read"
              onUpdate={this.updateBook}
            />

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={()=>(
          <SearchPage
            searchBooks={BooksAPI.search}
            bookList={books}
            onUpdate={this.updateBook}
            searchResults={searchResults}
            updateSearch={(results)=>this.updateSearchResults(results)}
            clearSearch={()=>this.clearSearchResults()}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
