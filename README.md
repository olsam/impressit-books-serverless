# impressit-books-serverless

## Installation
1. Make sure you have **serverless** installed
2. Clone this repo
> git clone https://github.com/olsam/impressit-books-serverless.git

3. Install dependencies
> cd impressit-books-serverless

> npm install

4. Install DynamoDB
> serverless dynamodb install

5. Start **serverless-offline**
> serverless offline start

## Ussage

### Add a book
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/book/add --data '{ "name": "Book Name", "releaseDate": 1585829833023, "authorName": "Book Author" }'

### Get All Books
curl -H "Content-Type:application/json" http://localhost:3000/dev/books

### Get Book By Id
curl -H "Content-Type:application/json" http://localhost:3000/dev/book/<uuid>

### Update a Book
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/book/<uuid>/update --data '{ "name": "Updated Book Name", "releaseDate": 1585829833012, "authorName": "Updated Book Author" }'

### Delete a Book
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/book/<uuid>/delete
