import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

class SearchPage extends Component {

  state = {
    books: []
  }

  updateBookList(books){
    this.setState({books: books});
  }

  clearBookList(){
    this.setState({books: []});
  }

  checkShelf = (book) => {
    this.props.bookList.map(shelfBook => {
      if(book.id === shelfBook.id){
        book.shelf = shelfBook.shelf;
      }
    })
  }

  render(){

    const { onUpdate } = this.props;

    let query = "";

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
              placeholder="Search by title or author"
              onChange={event => {
                query = event.target.value;
                if(query !== ""){
                  this.props.searchBooks(query).then(books => {
                    this.updateBookList(books);
                  });
                } else {
                  this.clearBookList();
                }
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookList
            bookList={this.state.books}
            checkSearchShelf={this.checkShelf}
            onUpdate={onUpdate} />
        </div>
      </div>
    )
  }
}

export default SearchPage;
