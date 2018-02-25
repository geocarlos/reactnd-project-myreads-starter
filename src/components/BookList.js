import React from 'react';

const BookList = (props) => {

  const { bookList, onUpdate } = props;

  if(!Array.isArray(bookList) || bookList.length === 0){
    return <div></div>;
  }

  // Check if a book is in one of the three shelves
  if(props.checkSearchShelf){
    bookList.map(book => props.checkSearchShelf(book))
  }

  const options = [
    {value: "currentlyReading", text: "Currently Reading"},
    {value: "wantToRead", text: "Want to Read"},
    {value: "read", text: "Read"},
    {value: "none", text: "None"}
  ]

  return (<ol className="books-grid">
    {bookList.map(book => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {!!book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>}
            <div className="book-shelf-changer">
              <select
                defaultValue={!!book.shelf?book.shelf:"none"}
                onClick={event => {
                  onUpdate(book, event.target.value);
                }}
              >
                <option value="none" disabled>Move to...</option>
                {options.map((option, i)=>(
                    <option key={i} value={option.value}>{option.text}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{!!book.authors && book.authors.map(a=>a)}<br /></div>
        </div>
      </li>
    ))}
  </ol>)
}

export default BookList;
