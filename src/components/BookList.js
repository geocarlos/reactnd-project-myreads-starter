import React from 'react';

const BookList = (props) => {

  const { bookList, onUpdate } = props;

  // Avoid picking first option right away
  let chosen = false;

  return (<ol className="books-grid">
    {bookList.map(book => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select onMouseUp={event => {chosen = !chosen; if(!chosen)
                onUpdate(book, event.target.value); console.log(event.target.value)}}
                onMouseLeave={()=> chosen = false}>
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
