# Password Strength Web Frontend

## Setup

1. Install dependencies:
    ```sh
    npm install
    ```

2. Configure API endpoint (optional):
    Copy the example environment file and configure your API base URL:
    ```sh
    cp .env.example .env
    ```
    Edit `.env` to set your backend API URL:
    ```
    REACT_APP_API_BASE_URL=http://localhost:5000
    ```
    If you don't create a `.env` file, it will default to `http://localhost:5000`.

3. Start the app:
    ```sh
    npm start
    ```

## Configuration

The application uses a centralized configuration system in `src/config.js` that reads the API base URL from the environment variable `REACT_APP_API_BASE_URL`. This allows you to:

- Use different API endpoints for development, testing, and production
- Override the default localhost:5000 URL when deploying
- Set up the backend on any port or domain

## Features

- Animated password strength checker with crazy style
- Hash cracker (demo, for learning)
- Security education tips

## Backend Requirements

The backend Flask API should be running and accessible at the configured URL (default: `localhost:5000`).