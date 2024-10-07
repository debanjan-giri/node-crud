# Restful Crud API

This project implements a RESTful API for performing CRUD operations (Create, Read, Update, Delete) 
using Node.js, Express, and MongoDB. It provides endpoints to manage textual data, with authentication middleware to secure the endpoints.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Mongoose](https://img.shields.io/badge/Mongoose-Latest-blue)

## Features
- **register:** Add a new user to the database.
- **login:** Verify a user from the database.
- **Create:** Add new textual data to the database.
- **Read:** Retrieve textual data along with timestamps.
- **Update:** Modify existing textual data.
- **Delete:** Remove textual data from the database.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository: `git@github.com:debanjan-giri/crud.git`
2. Navigate to the project directory: `cd crud`
3. Install dependencies: `npm install`
4. Set up environment variables by creating a `.env` file (with the following content: port, mongo_uri, jwt_secret).
5. Start the server: `npm start`

## API Endpoints

The following endpoints are available:

- **POST /api/create**: Create new textual data.
- **GET /api/read**: Retrieve textual data along with timestamps.
- **PUT /api/update/:id**: Update existing textual data.
- **DELETE /api/delete**: Delete textual data.

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). To access the endpoints, clients need to include a valid JWT in the request headers.

## Dependencies

- Express: Web framework for Node.js.
- Mongoose: MongoDB object modeling for Node.js.
- jsonwebtoken: JSON Web Token implementation for Node.js.
- dotenv: Loads environment variables from a `.env` file.
- bcryptjs: Password hashing library.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.

