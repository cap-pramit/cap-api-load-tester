// const {  approveBook, cancelBook } = require("./newBookRequestDB");
const express = require("express");
// const db = require("./data"); // Your database operations module
const moment = require("moment");
const {
  bookRequestsDB,
  approveBook,
  cancelBook,
  insertFromAPI,
} = require("./controller/newBookRequestDB.controller");
const bookCollection = require("./controller/book.controller");
const userCollection = require("./controller/user.controller");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

app.use(cors());
//Secret key for the JWT
const Secret_Key = process.env.SECRET_KEY;

// Middleware for CORS

//Endpoint for user signup
app.post("/Signup", async (req, res) => {
  const { username, useremail, userpassword } = req.body;

  const user = await userCollection.getUserByEmail(useremail);
  if (user) {
    res
      .status(409)
      .json({ success: false, message: "User already exist with the email" });
  } else {
    try {
      //Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(userpassword, 10);
      const newUser = {
        username,
        useremail,
        password: hashedPassword,
      };
      await userCollection.insertUsers(newUser);
      res
        .status(200)
        .json({ success: true, message: "User Succesfully Registered." });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});

//Endpoint for user Signin
app.post("/Signin", async (req, res) => {
  const { email, password } = req.body;

  //Retrive user from database by userEmail
  const user = await userCollection.getUserByEmail(email);

  //Check if user exist and compare the hashed password
  if (user) {
    try {
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          Secret_Key,
          { expiresIn: "15d" }
        );
        const resUser = {
          username: user.username,
          useremail: user.useremail,
          usertype: user.type,
          userid: user._id,
          token: token,
        };
        res.json({
          status: "SUCCESS",
          message: "Authentication Successful",
          resUser,
        });
      } else {
        res.status(400).json({ message: "Please enter valid Email/Password" });
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Please enter valid Email/Password" });
  }
});

//Middleware to verify the JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authentication;

  jwt.verify(token, Secret_Key, (err, decoded) => {
    if (err) {
      return res.json({
        message: {
          status: 404,
          message: `Session signed out please signin`,
        },
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

// Endpoint to get all books
app.get("/books", verifyToken, async (req, res) => {
  try {
    const books = await bookCollection.getAllBooks(req, res);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Endpoints to get all books of particular borrower
app.get("/books/borrow/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const books = await bookCollection.getAllBorrowedBooks(userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Endpoints to return a book
app.get("/books/return/:userId/:bookId", verifyToken, async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  try {
    const books = await bookCollection.returnBook(bookId, userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
// Endpoint to search books by name
app.get("/books/search/name/:name", verifyToken, async (req, res) => {
  const searchName = req.params.name;
  try {
    const books = await bookCollection.returnBook(bookId, userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to search books by author
app.get("/books/search/author/:author", verifyToken, async (req, res) => {
  const searchAuthor = req.params.author;
  try {
    const books = await bookCollection.getAllRequestedBooks(userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Endpoint to get all requested book of particular user
app.get("/books/request/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  try {
    const books = await bookCollection.getAllRequestedBooks(userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.put("/books/reserve", verifyToken, async (req, res) => {
  const bookId = req.query.book_id;
  const userId = req.query.user_id;

  try {
    const result = await bookCollection.reserveBook(bookId, userId);
    res.status(result.status).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// Endpoints to cancel a request
app.get(
  "/books/cancel_request/:userId/:bookId",
  verifyToken,
  async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    try {
      const books = await bookCollection.cancelRequest(bookId, userId);
      res.status(200).send({ status: 200, data: books });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Endpoint to borrow a book
app.post("/books/borrow/:bookId/:borrower", verifyToken, async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  try {
    const books = await bookCollection.cancelRequest(bookId, userId);
    res.status(200).send({ status: 200, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Endpoint to approve a new book request
// app.post("/books/new_request/approve/", verifyToken, async (req, res) => {
//   const requestId = req.body._id;
//   const data = req.body;
//   try {
//     const books = await approveBook(requestId, data);
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// Endpoint to reject a new book request

app.post("/books/new_request/cancel", verifyToken, async (req, res) => {
  console.log(req.body);
  const requestId = req.body._id;
  const data = req.body.reason;
  try {
    const books = await cancelBook(requestId, data);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.put("/books/issue", verifyToken, async (req, res) => {
  const bookId = req.query.book_id;
  const userId = req.query.user_id;

  try {
    const result = await bookCollection.borrowBook(bookId, userId);
    res.status(result.status).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get all new book requests
app.get("/books/requests", verifyToken, async (req, res) => {
  let { limit = 9, page = 1, searchText = "", filter = "" } = req.query || {};

  let query = {};

  if (searchText !== "") {
    if (filter === "book_name") {
      query = {
        book_name: new RegExp(searchText, "i"),
      };
    } else if (filter === "book_author") {
      query = {
        book_author: new RegExp(searchText, "i"),
      };
    } else if (filter === "email") {
      query = {
        email: new RegExp(searchText, "i"),
      };
    }
  }

  const skip = (page - 1) * limit;
  bookRequestsDB.count(query, (err, count) => {
    if (err) {
      res.status(500).send({ error: "DB Error", success: false });
    }

    bookRequestsDB
      .find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec((err, bookRequests) => {
        if (err) {
          res.status(500).send({ error: "DB Error", success: false });
        } else {
          res.status(200).json({
            success: true,
            result: bookRequests,
            totalRequests: count,
          });
        }
      });
  });
});

// Endpoint to add a new book request
app.post("/books/requests/new-request", verifyToken, async (req, res) => {
  const book = req.body;
  const query = {
    book_name: new RegExp(`^${book.book_name}$`, "i"),
  };

  bookRequestsDB.findOne(query, (err, bookRequest) => {
    if (bookRequest) {
      res.status(400).send({ success: false, error: "Book already requested" });
    } else {
      insertFromAPI(book)
        .then((insertedBook) => {
          res.status(201).send({ success: true, result: insertedBook });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ success: false, error: "Internal Server Error" });
        });
    }
  });
});

// Endpoint to add a new book to database
app.post("/books/add_book", verifyToken, async (req, res) => {
  const data = req.body;
  data.total_count = parseInt(data.total_count);
  data.current_count = parseInt(data.current_count);
  try {
    const newBook = {
      book_name: data.book_name,
      book_author: data.book_author,
      total_count: data.total_count,
      current_count: data.current_count,
      book_genre: data.book_genre,
    };
    const book = await bookCollection.insertBooks(newBook);
    await approveBook(data._id);
    res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
