const Datastore = require("nedb");
const path = require("path");
const moment = require("moment");

class BookRequest {
  constructor({
    book_name,
    book_author,
    email,
    date,
    state,
    cancel_reason = "",
    data = {},
  }) {
    this.book_name = book_name;
    this.book_author = book_author;
    this.email = email;
    this.date = date;
    this.state = state || "Pending";
    this.cancel_reason = cancel_reason;
    this.data = data;
  }
}
function getCurrentDate() {
  return new Date().toISOString();
}
const bookRequestsDB = new Datastore({
  filename: path.join(__dirname, "../database_files/bookRequests_db.nedb"),
  autoload: true,
});

// Initialize the database with sample data
const initializeDatabase = async () => {
  const bookRequests = await getAllRequests();
  if (bookRequests.length === 0) {
    const sampleData = [
      new BookRequest({
        book_name: "The Great Gatsby",
        book_author: "F. Scott Fitzgerald",
        email: "example@gmail.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "The Great Gatsby",
        book_author: "F. Scott Fitzgerald",
        email: "example@gmail.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "To Kill a Mockingbird",
        book_author: "Harper Lee",
        email: "sample1@example.com",
        date: getCurrentDate(),
        state: "Rejected",
        cancel_reason: "Book already exists in the library",
      }),
      new BookRequest({
        book_name: "1984",
        book_author: "George Orwell",
        email: "sample2@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Pride and Prejudice",
        book_author: "Jane Austen",
        email: "sample3@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "The Catcher in the Rye",
        book_author: "J.D. Salinger",
        email: "sample4@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "To the Lighthouse",
        book_author: "Virginia Woolf",
        email: "sample5@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "The Lord of the Rings",
        book_author: "J.R.R. Tolkien",
        email: "sample6@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Moby-Dick",
        book_author: "Herman Melville",
        email: "sample7@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Alice's Adventures in Wonderland",
        book_author: "Lewis Carroll",
        email: "sample8@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Frankenstein",
        book_author: "Mary Shelley",
        email: "sample9@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Moby-Dick",
        book_author: "Herman Melville",
        email: "sample7@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Alice's Adventures in Wonderland",
        book_author: "Lewis Carroll",
        email: "sample8@example.com",
        date: getCurrentDate(),
      }),
      new BookRequest({
        book_name: "Frankenstein",
        book_author: "Mary Shelley",
        email: "sample9@example.com",
        date: getCurrentDate(),
      }),
    ];
    await insertRequests(sampleData);
  }
};

// Retrieve all books
const getAllRequests = () => {
  return new Promise((resolve, reject) => {
    bookRequestsDB.find({}, (err, requests) => {
      if (err) {
        reject(err);
      } else {
        resolve(requests);
      }
    });
  });
};

const insertRequests = (requests) => {
  return new Promise((resolve, reject) => {
    bookRequestsDB.insert(requests, (err, insertedRequests) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertedRequests);
      }
    });
  });
};

const insertFromAPI = (book) => {
  return new Promise((resolve, reject) => {
    const new_book = new BookRequest({
      book_name: book.book_name,
      book_author: book.book_author,
      email: book.email,
      date: getCurrentDate(),
    });
    bookRequestsDB.insert(new_book, (err, insertedBook) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertedBook);
      }
    });
  });
};

//approve a book
const approveBook = async (requestId, data) => {
  console.log(requestId);
  return new Promise(async (resolve, reject) => {
    try {
      bookRequestsDB.findOne({ _id: requestId }, (err, doc) => {
        if (err) reject(err);
        else {
          bookRequestsDB.update(
            { _id: requestId },
            { ...doc, data: data, state: "Approved" },
            {}
          );
          resolve(doc);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

// cancel a book
const cancelBook = async (requestId, data) => {
  console.log(requestId);
  return new Promise(async (resolve, reject) => {
    try {
      bookRequestsDB.findOne({ _id: requestId }, (err, doc) => {
        if (err) reject(err);
        else {
          bookRequestsDB.update(
            { _id: requestId },
            { ...doc, reason: data, state: "Rejected" },
            {}
          );
          resolve(doc);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

initializeDatabase(); // Ensure the database is initialized with sample data

module.exports = {
  getAllRequests,
  insertFromAPI,
  bookRequestsDB,
  approveBook,
  cancelBook,
};
