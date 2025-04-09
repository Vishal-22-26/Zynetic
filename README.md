🛠 **Backend Developer Assignment –
Bookstore Application**

**Description -**
This is a simple RESTful API for a **Bookstore Application**. The API will
manage a collection of books and users, and allow for basic CRUD operations,
authentication, and filtering.

**Technologies Used -** 
Node.js
Express 
MongoDB
Docker/Docker Compose

**Getting Started -**

## Prerequisites

### Option 1: Docker Setup (Recommended)
To run this application using Docker (no need to install any other dependencies):

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included in Docker Desktop for Windows/Mac)

### Option 2: Manual Setup
If you prefer to run the application without Docker, you'll need:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

## Installation & Running the Application

### Using Docker (Option 1)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookstore-api.git
   cd bookstore-api
2. Start the application using Docker Compose:
     docker-compose up --build
3. The API will be available at:
     http://localhost:3000
4. To stop the application:
     # Press Ctrl+C in the terminal
     # OR run in a separate terminal:
     docker-compose down


### Manual Setup (Option 2)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookstore-api.git
   cd bookstore-api

2. Install dependencies:
    npm install

3. Make sure MongoDB is running on your system:
   # Start MongoDB (command may vary depending on your OS and installation method)
   # For example, on many Linux systems:
       sudo systemctl start mongod
   # Or on macOS with Homebrew:
       brew services start mongodb-community

4.  Update the MongoDB connection string in your configuration if necessary:

    * Create a .env file in the project root (if not already present)
    * Add MONGODB_URI=mongodb://localhost:27017/bookstore (or your preferred MongoDB URI)
   
5.  Start the application:
      npm run dev   # Development mode with auto-reload
          # OR
      npm start     # Production mode

6.  The API will be available at:
     http://localhost:3000

## API Documentation

This API provides endpoints for managing users and books in the bookstore application.

### Base URL

All endpoints are relative to: `http://localhost:3000/api`

### Authentication

The API uses JWT (JSON Web Token) authentication. After login, you'll receive a token that should be included in the Authorization header for protected routes:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Endpoints

#### User Management

| Method | Endpoint         | Description      | Authentication Required |
|--------|------------------|------------------|------------------------|
| POST   | /users/signup    | Register new user| No                     |
| POST   | /users/login     | User login       | No                     |

#### Book Management

| Method | Endpoint         | Description            | Authentication Required |
|--------|------------------|------------------------|------------------------|
| GET    | /books           | Get all books          | Yes                    |
| GET    | /books/:id       | Get book by ID         | Yes                    |
| POST   | /books           | Create a new book      | Yes                    |
| PUT    | /books/:id       | Update a book          | Yes                    |
| DELETE | /books/:id       | Delete a book          | Yes                    |

### Filtering and Searching

The `/books` endpoint supports various query parameters for filtering and searching:

| Parameter | Description                           | Example                     |
|-----------|---------------------------------------|----------------------------|
| category  | Filter books by category              | ?category=Fiction           |
| rating    | Filter books by minimum rating        | ?rating=4                   |
| page      | Page number for pagination            | ?page=1                     |
| limit     | Number of books per page              | ?limit=10                   |
| sort      | Sort field (prefix with - for desc)   | ?sort=-rating               |
| search    | Search books by title                 | ?search=Gatsby              |

Example: `http://localhost:3000/api/books?category=Fiction&rating=4&page=1&limit=10&sort=-rating`

### Request/Response Formats

#### User Signup

**Request:**
```json
POST /api/users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "email": "user@example.com"
    }
  }
}
```

#### User Login

**Request:**
```json
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "email": "user@example.com"
    }
  }
}
```

#### Create Book

**Request:**
```json
POST /api/books
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "price": 12.99,
  "rating": 4.5,
  "publishedDate": "1925-04-10"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "book": {
      "_id": "60d21b4667d0d8992e610c86",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Fiction",
      "price": 12.99,
      "rating": 4.5,
      "publishedDate": "1925-04-10",
      "createdAt": "2025-04-09T06:30:45.123Z"
    }
  }
}
```

#### Get Books

**Request:**
```
GET /api/books?category=Fiction&rating=4&page=1&limit=10&sort=-rating
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "status": "success",
  "results": 2,
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2
  },
  "data": {
    "books": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "category": "Fiction",
        "price": 12.99,
        "rating": 4.5,
        "publishedDate": "1925-04-10"
      },
      {
        "_id": "60d21b4667d0d8992e610c87",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "category": "Fiction",
        "price": 10.99,
        "rating": 4.2,
        "publishedDate": "1960-07-11"
      }
    ]
  }
}
```

### API Usage Examples

Here are some sample API requests to help you get started:

#### User Authentication

**Sign up a new user:**

```bash
curl -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Log in:**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Book Operations

**Create a new book:**

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "price": 12.99,
    "rating": 4.5,
    "publishedDate": "1925-04-10"
  }'
```

**Get all books with filtering:**

```bash
curl -X GET "http://localhost:3000/api/books?category=Fiction&rating=4&page=1&limit=10&sort=-rating" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Search books by title:**

```bash
curl -X GET "http://localhost:3000/api/books?search=Gatsby" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


That't it...
Happy Coding


