# Final Project Submission Answers

These outputs were captured from the completed application running locally on
port 5000.

## Question 1 - Forked GitHub repository

```bash
curl -s https://api.github.com/repos/MarcusCyborg/expressBookReviews | jq '.parent.full_name'
```

```text
"ibm-developer-skills-network/expressBookReviews"
```

## Question 2 - Retrieve all books

```bash
curl -s http://localhost:5000/
```

```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}},"2":{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},"3":{"author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}},"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},"9":{"author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},"10":{"author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}}
```

## Question 3 - Retrieve by ISBN

```bash
curl -s http://localhost:5000/isbn/1
```

```json
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

## Question 4 - Retrieve by author

```bash
curl -s "http://localhost:5000/author/Chinua%20Achebe"
```

```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Question 5 - Retrieve by title

```bash
curl -s "http://localhost:5000/title/Things%20Fall%20Apart"
```

```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Question 6 - Retrieve initial review

```bash
curl -s http://localhost:5000/review/1
```

```json
{}
```

## Question 7 - Register a user

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"username":"student123","password":"password123"}' http://localhost:5000/register
```

```json
{"message":"User successfully registered. Now you can login"}
```

## Question 8 - Log in

```bash
curl -s -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username":"student123","password":"password123"}' http://localhost:5000/customer/login
```

```json
{"message":"Login successful!"}
```

## Question 9 - Add or update a review

```bash
curl -s -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book"
```

```json
{"message":"Review for ISBN 1 added or updated","reviews":{"student123":"This is a great book"}}
```

## Question 10 - Delete a review

```bash
curl -s -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```

```json
{"message":"Review for ISBN 1 deleted"}
```

## Question 11 - `general.js` URL

https://github.com/MarcusCyborg/expressBookReviews/blob/main/final_project/router/general.js
