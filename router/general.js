import { Router } from "express";
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
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

export const general = public_users;
