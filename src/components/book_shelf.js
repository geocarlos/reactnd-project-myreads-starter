import React, { Component } from 'react';

class BookShelf extends Component{

  render(){

    const { bookList, name } = this.props;

    if(bookList.length > 0) {
      bookList.map((book, i) => console.log(`${i}: ${book.title}, ${book.imageLinks.thumbnail}`))
    }
    if(bookList.length < 1) return (<div>Loading data ...</div>)
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {bookList.map((book, i)=>(
                  <li key={i}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors[0]}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf;
