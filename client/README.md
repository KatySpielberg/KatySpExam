# Vue 3 Application - Senior Client-Side Developer Exam

## Overview
This project is a Vue 3 application that dynamically renders categories, items, and subitems based on JSON data provided by a simple Node.js server. It demonstrates component architecture, state management using Pinia, real-time filtering, and routing for item and subitem details.

## Project Setup

### Backend Setup
The backend is a simple Node.js server that serves static JSON data from the `/api/data` endpoint.

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server.js
    ```
   The server will be running at `http://localhost:3001`.

### Frontend Setup
The frontend is a Vue 3 application that consumes the data from the backend.

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run serve
    ```
   The application will be running at `http://localhost:8080`.

### Project Features

- **Dynamic Component Rendering**: The application dynamically renders categories, items, and subitems from the JSON data.
- **Component Interaction**: Click on a category or item to expand/collapse its content, revealing subitems.
- **State Management**: The application state is managed using Pinia, with shared state across components.
- **Filtering and Searching**: A search feature allows filtering of items and subitems across all categories in real-time as the user types.
- **Details View**: When an item or subitem is clicked, its details are displayed on a dedicated page, managed through Vue Router.

### Testing the Application
1. Start both the backend and frontend servers as described above.
2. Navigate to `http://localhost:8080` to interact with the application.
3. Use the search bar to filter items and subitems.
4. Click on an item or subitem to navigate to its details page.

### Notes
- The project uses Pinia for state management.
- Vue Router is used for navigating between item and subitem details.

### Customize Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).