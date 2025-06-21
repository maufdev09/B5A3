Collecting workspace information```markdown
# B5A3 - Book Library API

A simple Node.js RESTful API for managing a book library, built with Express and Mongoose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
git clone https://github.com/yourusername/B5A3.git
cd B5A3
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Reference

### Books

#### `POST /api/books`

- **Description:** Create a new book.
- **Request Body:**
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "genre": "FICTION",
      "isbn": "1234567890",
      "description": "Book description",
      "copies": 5,
      "available": true
    }
    ```
- **Response:** Created book object.

#### `GET /api/books`

- **Description:** Retrieve a list of books. Supports filtering, sorting, and limiting.
- **Query Parameters:**
  - `filter`: Genre to filter by.
  - `sort`: "asc" or "desc".
  - `sortBy`: Field to sort by.
  - `limit`: Number of results to return.
- **Response:** Array of book objects.

#### `GET /api/books/:bookId`

- **Description:** Retrieve a single book by ID.
- **Response:** Book object.

#### `PATCH /api/books/:bookId`

- **Description:** Update a book by ID.
- **Request Body:** Fields to update.
- **Response:** Updated book object.

#### `DELETE /api/books/:bookId`

- **Description:** Delete a book by ID.
- **Response:** Success message.

### Borrow

#### `POST /api/borrow`

- **Description:** Borrow a book.
- **Request Body:**
    ```json
    {
      "book": "bookObjectId",
      "quantity": 1,
      "dueDate": "2024-12-31"
    }
    ```
- **Response:** Borrow record.

#### `GET /api/borrow`

- **Description:** Get a summary of borrowed books (total quantity per book).
- **Response:** Array of objects with book info and total quantity borrowed.

## Project Structure

```
src/
  app.ts
  server.ts
  App/
    controllers/
      book.controller.ts
      borrow.controller.ts
    interface/
      book.interface.ts
      Borrow.interface.ts
    models/
      book.models.ts
      Borrow.model.ts
```

- **controllers/**: Route handlers for books and borrowing.
- **models/**: Mongoose models for books and borrow records.
- **interface/**: TypeScript interfaces for type safety.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](LICENSE)
```