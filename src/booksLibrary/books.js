import React from "react";

class books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [{ id: 1, name: "First Book" }],
      currentBookName: "",
    };
  }

  renderItems() {
    return this.state.books.map((book) => {
      return (
        <li key={book.id}>
          <span>{book.name}</span>
          <button onClick={() => this.deleteBook(book)}>Delete</button>
        </li>
      );
    });
  }

  deleteBook(bookD) {
    const bookList = this.state.books;
    const newBookList = bookList.filter((book) => book !== bookD);
    this.setState({ books: newBookList });
  }

  addBook() {
    const newBook = {
      id: Math.floor(Math.random() * 100),
      name: this.state.currentBookName,
    };

    const bookList = this.state.books;
    bookList.push(newBook);
    this.setState({ currentBookName: "" });
  }

  render() {
    return (
      <div>
        <div>
          <input
            id="newBookName"
            placeholder="Enter book name"
            type="text"
            value={this.state.currentBookName}
            onChange={(e) => this.setState({ currentBookName: e.target.value })}
          />
          <button id="addBook" onClick={() => this.addBook()}>
            Add Book
          </button>
        </div>
        <hr />
        <ul>{this.renderItems()}</ul>
      </div>
    );
  }
}

export default books;
