import { Router, response } from "express";
import books from "./booksdb.js";
import { doesExist } from "./auth_users.js";
import { registeredUsers } from "./auth_users.js";
const public_users = Router();

public_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      registeredUsers.push({ username: username, password: password });
      return res.status(200).send(`${username} is successfully registered!`);
    } else {
      return res.status(200).send(`${username} is alreary registered!`);
    }
  } else {
    return res.status(200).send(`${username} are you crazy baby`);
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    resolve(books);
  });
  myPromise.then((response) => {
    res.send(response);
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    let filteredBooks = books[isbn];
    resolve(filteredBooks);
  });

  myPromise.then((response) => {
    res.send(response);
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const author = req.params.author;
    let filteredBooks = Object.entries(books).filter((book) => {
      let bookAuthor = book[1]["author"];
      return bookAuthor.includes(author);
    });
    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject(`No books found from author: ${author}`);
    }
  });

  myPromise
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const title = req.params.title;
    let filteredBooks = Object.entries(books).filter((book) => {
      let bookTitle = book[1]["title"];
      return bookTitle.includes(title);
    });
    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject(`No books found with title: ${title}`);
    }
  });

  myPromise
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let filteredBook = books[isbn];
  console.log(filteredBook);
  if (filteredBook) {
    res.send(Object.values(filteredBook["reviews"]));
  } else {
    res.send(`No reviews found for isbn: ${isbn}`);
  }
});

export const general = public_users;
