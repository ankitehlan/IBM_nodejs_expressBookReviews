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
  let filteredUser = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (filteredUser.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in!" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "verysecretkey",
      {
        expiresIn: 60 * 60,
      }
    );
    req.session.authorization = {
      accessToken,
      username,
    };
    res.status(200).send("User successfully logged in!");
  } else {
    res.status(208).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

export const authenticated = regd_users;
export const doesExist = isValid;
export const registeredUsers = users;
