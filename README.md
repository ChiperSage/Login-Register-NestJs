Sure! Here is the revised README without code blocks and folder structure:

---

# NestJS Authentication and User Management

This project is a basic implementation of authentication and user management using NestJS. It includes features for user registration, login, and protected routes for user management that are accessible only to authenticated users.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Overview](#project-overview)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:  
   `git clone https://github.com/your-username/auth-app.git`  
   `cd auth-app`

2. Install dependencies:  
   `npm install`

3. Configure the database connection:  
   Update the database connection settings in `src/app.module.ts` to match your PostgreSQL configuration.

## Running the Application

1. Start the application:  
   `npm run start`

2. Access the API:  
   The application will be running on `http://localhost:3000`.

## Project Overview

The project is structured into two main modules: `auth` and `users`.

- **Auth Module:** Manages authentication-related tasks including login, registration, and JWT strategies.
- **Users Module:** Manages user-related tasks including user creation and retrieval.

## API Endpoints

### Authentication

- **POST /auth/register:**  
  Registers a new user.  
  **Request Body:**  
  `{ "username": "string", "password": "string" }`  
  **Response:**  
  `{ "access_token": "string" }`

- **POST /auth/login:**  
  Logs in an existing user.  
  **Request Body:**  
  `{ "username": "string", "password": "string" }`  
  **Response:**  
  `{ "access_token": "string" }`

### User Management

- **GET /users/profile:**  
  Retrieves the profile of the logged-in user.  
  **Headers:**  
  `{ "Authorization": "Bearer <access_token>" }`  
  **Response:**  
  `{ "id": "number", "username": "string" }`

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to customize the content as needed.
