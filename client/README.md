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

###
###
###
### Katy's Notes
###
###
###
###
### Future Enhancements:
- Use getters instead computed in complex app.
    (I provided the example of using getters for filteredItems in Category Component.)
-  UI/UX Enhancements 
    - I already added buttons 'Home' and 'Back'.
    - Add Loader.
    - Visual design improving.
- Add 'page not found'
- Detailed Error Handling (now missing indication for errors: server is down or bad request or another problem)
- More Complex Backend 
    - backend is fairly simple, serving static JSON data from a single endpoint.
    - handle more complex scenarios, like adding, updating, or deleting categories, items, and subitems.
- Advanced Search/Filtering

### Dynamic UI Updates
- The data fetched using Axios is stored in a reactive state managed by Pinia. 
When the state (such as the list of categories or items) changes, Vue automatically re-renders any components that depend on this data.

### Dynamic Data Flow
- When the application loads, it fetches the JSON data from the server.
- This data is stored in the state managed by Pinia.
- Components like CategoryComponent, ItemComponent, and SubitemComponent use props to dynamically render the data passed to them, allowing the UI to adapt based on the specific data for each category, item, and subitem.

### Express Server
- Express is a minimal and flexible Node.js web application framework used for building web and mobile applications.
- Routing: Express handles HTTP requests, allowing the app to respond to different endpoints. For example, the /api/data endpoint serves the JSON data.
- Middleware: Express uses middleware functions like cors to handle cross-origin requests, enabling the frontend to fetch data from the backend.

### Axios and State Management
- Axios is used to fetch data from the server, which is hosted on a local Express server at http://localhost:3001/api/data. Axios makes an HTTP GET request to this endpoint to retrieve the JSON data, which contains categories, items, and subitems.
- Once the data is fetched, it is stored in the state using Pinia, a state management library for Vue 3. This data is then accessed and used by various components to render categories, items, and subitems dynamically in the UI. The state is also reactive, meaning any changes to the data (like updates from a search query) automatically update the UI.

### CORS Configuration
- CORS is enabled to allow requests from the frontend running on a different port.


