import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

class SearchPage extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (query)=>{
    this.setState({query: query})
  }

  render(){

    const { query, books } = this.state;

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
              value={query}
              onChange={event => {
                this.updateQuery(event.target.value)
                this.props.searchBooks(query).then(books => {
                  try{
                    this.setState({books: books});
                  } catch(error){
                    console.log(error);
                  }
                });
                console.log(books);
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookList bookList={books} />
        </div>
      </div>
    )
  }
}

export default SearchPage;
