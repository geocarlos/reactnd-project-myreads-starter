import React from 'react';
import BookList from './BookList';

const BookShelf = (props) => {

  const {bookList, name, onUpdate} = props;

  return (<div className="list-books-content">
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <BookList bookList={bookList} onUpdate={onUpdate}/>
        </div>
      </div>
    </div>
  </div>)
}

export default BookShelf;
