import { Router } from "express";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";
const regd_users = Router();

let users = [];

const isValid = (username) => {
  let user = users.filter((user) => {
    return user.username === username;
  });
  if (user.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

export const authenticated = regd_users;
export const doesExist = isValid;
export const registeredUsers = users;
