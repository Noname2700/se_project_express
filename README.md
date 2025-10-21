# WTWR (What to Wear?): Back End

The back-end project focuses on creating a server for the WTWR application, where users can have the full experience of the website with complete functionality.

Throughout this project, we learned the basic and advanced functionality of the behind-the-scenes operations of a website. This mainly involved creating and running a server, handling errors, creating a database, and learning to connect it. All of this was made possible by multiple dependencies we added to our project to make the backend work, including Express.js, MongoDB, and Nodemon (which automatically refreshes our server so we don't have to exit and run again every time we make changes to our project), and Validator.

We then learned to secure our web app by implementing JWT (JSON Web Token), which is a way for the server and client to share sensitive information between each other. This was designed to work with the following dependencies: CORS and Bcrypt, which are ways for us to prevent sensitive information from being stolen and misused. This really helps us secure the page with specific requirements that we added. If the user is a continuing client, JWT will provide verification and allow them to create a token that will permit users to use the web app without having to sign in again once the requirements are met. JWT then takes that information and stores it in a safe place, after which users can freely roam through the site.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Technology

- MongoDB
- JavaScript
- Express
- Nodemon
- ESLint
- JWT
- Validator
- CORS
- Bcrypt

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/12pIF44sdZkHN-HdcU9jWY8z-S64njkUL/view?usp=drive_link), where I describe my project and some challenges I faced while building it.
