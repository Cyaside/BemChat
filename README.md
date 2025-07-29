# BEM Chatting

## Features

- **User Authentication**: Secure registration and login system for BEM members.
- **Instant Messaging**: Send and receive messages in real-time.
- **Conversation Management**: View and manage chat conversations with other members.
- **Message Actions**: Edit and delete your own messages.
- **User List**: See a list of all registered in BEM Chattting members to initiate chats.
- **Responsive Design**: Interfaces adapt to size of the screen

## Color Palette

- **Red**
- **Blue Shades**
- **White**

Gradients like `from-red-400 to-blue-500` are frequently used for buttons, icons, and also chat bubbles or background

## Tech Stack

- Vue.js
- Vite
- Tailwind Css
- Nodejs
- MongoDB
- ExpressJs

## Local Deployment

Follow these steps to set up and run BEM Chatting on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
- **npm** or **Yarn**: Package managers for Node.js. npm comes with Node.js, or you can install Yarn globally (`npm install -g yarn`).
- **MongoDB**: A MongoDB instance (local or cloud-based like MongoDB Atlas).
  - For local installation, follow instructions on [mongodb.com](https://www.mongodb.com/docs/manual/installation/).
  - For MongoDB Atlas, create a free cluster and get your connection string.

### 1. Backend Setup

The backend is an Express.js application located in the `api` directory.

1.  **Navigate to the API directory**:

    cd api

2.  **Install dependencies**:

    npm install

    or

    yarn install

3.  **Create a `.env` file**:
    In the `api` directory, create a file named `.env` and add the following environment variables. Replace the placeholder values with your actual MongoDB URI and a strong secret key.

    **.env**  
    MONGODB_URI="mongodb+srv: <username>:<password>@<cluster-url>/cluster0retryWrites=true w=majority"  
    JWT_SECRET="your_very_strong_and_random_jwt_secret_key"  
    PORT=5000  
    FRONTEND_URL= http://localhost:5173

    - **`MONGODB_URI`**: Your MongoDB connection string. Ensure the database name in the URI is `cluster0` as used in the models. (atau minta gweh aja buat urlnya)
    - **`JWT_SECRET`**: A secret key used for signing JWT tokens. Make it long and complex(gk ush kalau local mah).
    - **`PORT`**: The port on which the backend server will run. Default is `5000`.
    - **`FRONTEND_URL`**: The URL of your frontend application. This is used for CORS configuration.

4.  **Start the backend server**:

    node index.js

    or

    npm run dev

    The server will start on the specified `PORT` (default: `http://localhost:5000`). You should see console logs indicating the server is running.

### 2. Frontend Setup

The frontend is a Vue.js application. The project root contains the `package.json` for the frontend.

1.  **Navigate to the project root directory**:
    If you are still in the `api` directory, go back to the root:

    cd ..

2.  **Install dependencies**:

    npm install

    or

    yarn install

3.  **Start the frontend development server**:

    npm run dev

    or

    yarn dev

    The frontend application will typically run on `http://localhost:5173`. The `vite.config.ts` file is configured to proxy API requests from `/api` to the backend running on `http://localhost:5000`.

### 3. Access the Application

Once both the backend and frontend servers are running, open your web browser and navigate to:

http://localhost:5173

### Note

a bit laggy during messages and loading there, wait a bit before the contacts and its messages load.
