import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

class SearchPage extends Component {

  state = {
    query: ""
  }

  // Show book shelf on search results
  checkShelf = (book) => {
    this.props.bookList.map(shelfBook => {
      if(book.id === shelfBook.id){
        book.shelf = shelfBook.shelf;
      }
      return null; // Just get rid of the warning without dealing with ESLint :D
    })
  }

  updateQuery = (query) => {
    this.setState({query: query})
    if(query !== ""){
      this.props.searchBooks(query).then(books => {
        this.props.updateSearch(books);
      });
    } else {
      this.props.clearSearch();
    }
  }

  render(){

    const { onUpdate, searchResults } = this.props;

    const { query } = this.state;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={event => {
                this.updateQuery(event.target.value);
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookList
            bookList={searchResults}
            checkSearchShelf={book=>this.checkShelf(book)}
            onUpdate={onUpdate} />
        </div>
      </div>
    )
  }
}

export default SearchPage;
