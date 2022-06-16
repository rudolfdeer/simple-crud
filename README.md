# CRUD API

Simple CRUD API using in-memory database underneath.

## Setup and Running

- Use 16 LTS version of Node.js.
- Install dependencies: `npm i`.
- To start server in development mode: `npm start:dev`.
- To start server in production mode: `npm start:prod`.
- Now you can send requests to the address: `http://127.0.0.1:3000`.

## Usage
  - **GET** `api/users` is used to get all persons
    * **Success Response:**
      - `status code` **200** and all users records
  - **GET** `api/users/${userId}`
    * **Success Response:** 
        - `status code` **200** and record with `id === userId`
    * **Error Response:**
        - `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - **POST** `api/users` is used to create record about new user and store it in database
    * **Data Params**

      ```typescript
        {
          username: string, //required
          age: number, //required
          hobbies: string[] //required 
        }
        ```
    * **Success Response:**
        - `status code` **201** and newly created record
    * **Error Response:**
        - `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - **PUT** `api/users/{userId}` is used to update existing user
    * **Data Params**

      ```typescript
        {
          username: string, 
          age: number, 
          hobbies: string[] 
        }
        ```
    * **Success Response:**
      - ` status code` **200** and updated record
    * **Error Response:**
        - ` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - ` status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - **DELETE** `api/users/${userId}` is used to delete existing user from database
    * **Success Response:**
        - `status code` **204** if the record is found and deleted
    * **Error Response:**
        - `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - `status code` **404** and corresponding message if record with `id === userId` doesn't exist
