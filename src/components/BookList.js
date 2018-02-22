import React from 'react';

const BookList = (props) => {

  const { bookList, onUpdate } = props;

  return (<ol className="books-grid">
    {bookList.map(book => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select
                defaultValue={book.shelf}
                onMouseUp={event => {onUpdate(book, event.target.value)}}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.map(a=>a)}<br /></div>
        </div>
      </li>
    ))}
  </ol>)
}

export default BookList;
