const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("./booksdb.js");
const regd_users = express.Router();

const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "book-review-access";

const isValid = (username) => users.some((user) => user.username === username);

const authenticatedUser = (username, password) =>
  users.some(
    (user) => user.username === username && user.password === password
  );

// Only registered users can log in.
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };

  return res.status(200).json({ message: "Login successful!" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const review = req.query.review || req.body.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }

  if (typeof review !== "string" || !review.trim()) {
    return res.status(400).json({ message: "A non-empty review is required" });
  }

  books[isbn].reviews[username] = review.trim();

  return res.status(200).json({
    message: `Review for ISBN ${isbn} added or updated`,
    reviews: books[isbn].reviews,
  });
});

// A registered user can delete only their own review.
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }

  if (!Object.hasOwn(books[isbn].reviews, username)) {
    return res.status(404).json({ message: `No review by ${username} for ISBN ${isbn}` });
  }

  delete books[isbn].reviews[username];
  return res.status(200).json({ message: `Review for ISBN ${isbn} deleted` });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
