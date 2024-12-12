# Task Manager Frontend

This is the frontend for the Task Manager application, built using React.js. It provides an intuitive interface for managing tasks, including creating, reading, updating, and deleting tasks.

## Features

- **Responsive Design**: Fully responsive UI, compatible with all devices.
- **Task Management**: Create, edit, delete, and view tasks with details like title, description, due date, status, and priority.
- **User Authentication**: Secure login and registration system integrated with JWT.
- **Dynamic UI**: Real-time updates to reflect task modifications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rishigautam5474/magnet-task-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd task-manager-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variable:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:4000
   ```

## Usage

### Start the Development Server
Run the application in development mode:
```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

### Build for Production
Build the app for production:
```bash
npm run build
```

The production-ready files will be in the `build/` directory.

## Project Structure

```plaintext
├── src
│   ├── components       # Reusable React components
│   ├── pages            # Application pages (e.g., Home, Login, Task List)
│   ├── services         # API integration logic
│   ├── context          # Context for global state management
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
├── public
├── .env
├── package.json
└── README.md
```

## Dependencies

- **react**: JavaScript library for building user interfaces.
- **react-router-dom**: Routing library for React.
- **axios**: HTTP client for API calls.
- **bootstrap**: CSS framework for styling.

## API Integration
The frontend communicates with the backend through RESTful APIs. Ensure the backend server is running and accessible at the base URL specified in the `.env` file.

## Available Pages

- **Task List**: View all tasks with options to edit or delete.
- **Create Task**: Form to add a new task.
- **Edit Task**: Form to update an existing task.
- **Login**: User authentication page.
- **Register**: New user registration page.


