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
    BooksAPI.getAll().then(books =>{
      this.setState({books: books})
    });
  }

  /*
    Prevent previous search results to show when returning to the search page
  */
  componentWillReceiveProps(){
    this.clearSearchResults();
  }

  updateBook = (book, shelf)=>{
      if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
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
              name="Want to Read"
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
