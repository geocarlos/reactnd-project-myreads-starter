import React, { Component } from 'react';
import BookList from './BookList';

class BookShelf extends Component{

  render(){

    const { bookList, name } = this.props;

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
              <BookList bookList={bookList} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf;
