# Express Book Reviews

Completed IBM Node.js and Express final project. This repository is a fork of
[`ibm-developer-skills-network/expressBookReviews`](https://github.com/ibm-developer-skills-network/expressBookReviews).

## Run locally

```bash
cd final_project
npm install
npm start
```

The API listens on `http://localhost:5000` by default.

## Implemented features

- Retrieve all books or search by ISBN, author, and title.
- Retrieve reviews for a book.
- Register and log in with session and JWT authentication.
- Add, update, and delete a logged-in user's own review.
- Four reusable Axios methods in `final_project/router/general.js`, implemented
  with promises and async/await.

The exact cURL commands and captured outputs required for submission are in
[`submission_answers.md`](submission_answers.md).
