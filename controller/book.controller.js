const moment = require("moment");
const INITIAL_BOOKS_LIST = require("../data/initialBooks");
const Datastore = require("nedb");
const path = require("path");
const {
  bookRequestsDB,
  insertFromAPI,
} = require("./newBookRequestDB.controller");

class Book {
  constructor({
    book_id = 0,
    book_name,
    book_author,
    book_genre,
    total_count = 0,
    current_count = 0,
  }) {
    this.book_id = book_id;
    this.book_name = book_name;
    this.book_author = book_author;
    this.book_genre = book_genre;
    this.total_count = total_count;
    this.current_count = current_count;
  }
}

const bookCollection = new Datastore({
  filename: path.join(__dirname, "../database_files/all_book_collection.nedb"),
  autoload: true,
});

//Get all books

// Search by user borrowed books
const getAllBorrowedBooks = (userId) => {
  return new Promise((resolve, reject) => {
    const query = { "borrowers.userId": userId };
    bookCollection.find(query, (err, books) => {
      if (err) {
        reject(err);
      } else {
        // console.log(books)
        resolve(books);
      }
    });
  });
};

//Return a book
const returnBook = async (bookId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      bookCollection.findOne({ _id: bookId }, (err, doc) => {
        if (err) reject(err);
        else {
          const newArr = doc?.borrowers.filter((obj) => obj.userId !== userId);
          doc.current_count = doc.current_count + 1;
          doc.borrowers = newArr;
          if (doc?.requests?.length > 0) {
            const item = doc.requests[0];
            doc.requests.shift();
            doc.borrowers.push(item);
            doc.current_count = doc.current_count - 1;
          }
          bookCollection.update({ _id: bookId }, doc, {});
          resolve(doc);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Search by user requested books
const getAllRequestedBooks = (userId) => {
  return new Promise((resolve, reject) => {
    const query = { "requests.userId": userId };
    bookCollection.find(query, (err, books) => {
      if (err) {
        reject(err);
      } else {
        resolve(books);
      }
    });
  });
};

//cancel a book
const cancelRequest = async (bookId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      bookCollection.findOne({ _id: bookId }, (err, doc) => {
        if (err) reject(err);
        else {
          const newArr = doc.requests.filter((obj) => obj.userId !== userId);
          doc.requests = newArr;
          bookCollection.update({ _id: bookId }, doc, {});
          resolve(doc);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Initialize the database with sample data
const initializeDatabase = async () => {
  const books = await getInitialBookList();
  if (books.length === 0) {
    const sampleData = INITIAL_BOOKS_LIST.map((book) => new Book(book));
    await insertBooks(sampleData);
  }
};

const getInitialBookList = async () => {
  return new Promise((resolve, reject) => {
    bookCollection.find({}, (err, books) => {
      if (err) reject(err);
      else resolve(books);
    });
  });
};

// Retrieve all books support searching and pagination
const getAllBooks = (request, response) => {
  const {
    limit = 10,
    page = 1,
    bookName = "",
    authorName = "",
    genre = null,
  } = request.query || {};

  return new Promise(async (resolve, reject) => {
    let query = {};

    // Search by book name
    if (bookName !== "") query.book_name = new RegExp(bookName, "i");

    // Search by book author name
    if (authorName !== "") query.book_author = new RegExp(authorName, "i");

    // Filter by genre
    if (genre) query.book_genre = new RegExp(genre, "i");

    const skip = (page - 1) * limit;

    bookCollection.count(query, (err, count) => {
      if (err) reject(err);
      bookCollection
        .find(query)
        .sort({ book_id: 1 })
        .skip(skip)
        .limit(limit)
        .exec((err, books) => {
          console.log(books);
          if (err) {
            reject(err);
          } else {
            resolve({
              result: books,
              totalBooks: count,
            });
          }
        });
    });
  });
};

// Search books by name
const searchBooksByName = (name) => {
  return new Promise((resolve, reject) => {
    const query = { name: new RegExp(name, "i") };
    bookCollection.find(query, (err, books) => {
      if (err) {
        reject(err);
      } else {
        resolve(books);
      }
    });
  });
};

// Search books by author
const searchBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    const query = { author: new RegExp(author, "i") };
    bookCollection.find(query, (err, books) => {
      if (err) {
        reject(err);
      } else {
        resolve(books);
      }
    });
  });
};

// Borrow a book
const borrowBook = async (bookId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const book = await bookCollection.findOne({
        _id: bookId,
      });

      if (!book) {
        resolve({ status: 404, message: "Book not available for borrowing." });
      } else {
        await bookCollection.update(
          { _id: bookId },
          {
            $inc: { current_count: -1 },
            $push: {
              borrowers: {
                userId: userId,
                borrowedDate: moment().toDate(),
              },
            },
          },
          { multi: false, returnUpdatedDocs: true },
          (err, numberAffected, updatedBook) => {
            if (!err) {
              bookCollection.loadDatabase();
              resolve({
                updatedBook,
                status: 200,
              });
            }
          }
        );
      }
    } catch (err) {
      reject(err);
    }
  });
};

const reserveBook = async (bookId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const book = await bookCollection.findOne({ _id: bookId });

      if (!book) {
        resolve({ status: 404, message: "Book cannot be reserved." });
      } else {
        await bookCollection.update(
          { _id: bookId },
          {
            $push: {
              requests: { userId: userId, requestDate: moment().toDate() },
            },
          },
          { multi: false, returnUpdatedDocs: true },
          (err, numberAffected, updatedBook) => {
            if (!err) {
              bookCollection.loadDatabase();
              resolve({
                updatedBook,
                status: 200,
              });
            }
          }
        );
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Insert multiple books
const insertBooks = (books) => {
  return new Promise((resolve, reject) => {
    bookCollection.insert(books, (err, insertebookCollectionooks) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertebookCollectionooks);
      }
    });
  });
};

initializeDatabase(); // Ensure the database is initialized with sample data

module.exports = {
  getAllBooks,
  searchBooksByName,
  searchBooksByAuthor,
  borrowBook,
  reserveBook,
  getAllBorrowedBooks,
  getAllRequestedBooks,
  cancelRequest,
  returnBook,
  insertBooks,
};
