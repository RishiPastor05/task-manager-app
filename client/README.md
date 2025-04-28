Task Management Application:
This is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to manage their tasks, including creating, updating, deleting, and filtering tasks.



Clone the repository:

git clone <repository-url>

For backend Setup:
Create a ".env" file:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

cd server
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
npm run dev


For frontend Setup:
cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install axios react-router-dom prop-types
npm run dev


#Technical Choices and Architecture

Frontend (React, TailwindCSS):
React provides a component-based architecture that allows for easy management and reusability of UI elements.
TailwindCSS is used for styling due to its utility-first approach, enabling fast styling without having to manage complex CSS files.
Axios is used for making HTTP requests to interact with the backend API.
React Router is used for handling routing within the application.

Backend (Node.js, Express, MongoDB):
Node.js provides a non-blocking, event-driven environment for building scalable server-side applications.
Express.js is used as the web framework for routing and handling requests and middleware.
MongoDB is used for data storage because of its flexibility and scalability. Mongoose is used for MongoDB interactions, providing an elegant and powerful way to manage data.
JWT (JSON Web Tokens) is used for handling authentication and maintaining user sessions securely.

Authentication:
JWT is used for authentication and securing routes. Tokens are generated when the user logs in and are used to authenticate API requests.

Database:
MongoDB stores the tasks with details such as title, description, priority, status, and the user who created the task.