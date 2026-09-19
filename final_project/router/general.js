const express = require("express");
const axios = require("axios");
const books = require("./booksdb.js");
const isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users;
const public_users = express.Router();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const getAllBooks = async () => Promise.resolve(books);

const getBookByISBN = (isbn) =>
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
      return;
    }

    reject(new Error(`Book with ISBN ${isbn} not found`));
  });

const findBooks = async (field, value) => {
  const allBooks = await getAllBooks();
  const searchValue = value.toLowerCase();

  return Object.fromEntries(
    Object.entries(allBooks).filter(
      ([, book]) => book[field].toLowerCase() === searchValue
    )
  );
};

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User is already registered" });
  }

  users.push({ username, password });
  return res
    .status(201)
    .json({ message: "User successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  const allBooks = await getAllBooks();
  return res.status(200).json(allBooks);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  const matches = await findBooks("author", req.params.author);
  return Object.keys(matches).length
    ? res.status(200).json(matches)
    : res.status(404).json({ message: "No books found for this author" });
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  const matches = await findBooks("title", req.params.title);
  return Object.keys(matches).length
    ? res.status(200).json(matches)
    : res.status(404).json({ message: "No books found with this title" });
});

// Get book reviews
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    return res.status(200).json(book.reviews);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Axios client methods required by the concurrency portion of the assignment.
const fetchAllBooks = async () => (await axios.get(`${API_BASE_URL}/`)).data;

const fetchBookByISBN = (isbn) =>
  axios
    .get(`${API_BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then((response) => response.data);

const fetchBooksByAuthor = async (author) =>
  (await axios.get(`${API_BASE_URL}/author/${encodeURIComponent(author)}`)).data;

const fetchBooksByTitle = (title) =>
  axios
    .get(`${API_BASE_URL}/title/${encodeURIComponent(title)}`)
    .then((response) => response.data);

module.exports.general = public_users;
module.exports.fetchAllBooks = fetchAllBooks;
module.exports.fetchBookByISBN = fetchBookByISBN;
module.exports.fetchBooksByAuthor = fetchBooksByAuthor;
module.exports.fetchBooksByTitle = fetchBooksByTitle;
