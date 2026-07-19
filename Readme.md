# LifeLineAI

LifeLineAI is an AI-powered emergency assistance web application designed to provide immediate guidance and support during critical situations. By leveraging Google Gemini AI, the application analyzes user-described symptoms and scenarios, offers relevant first-aid instructions, and helps locate nearby hospitals using OpenStreetMap data. This project aims to deliver a responsive and reliable tool for initial emergency response.

## Live Demo

Experience LifeLineAI in action:
[https://life-line-ai-zeta.vercel.app](https://life-line-ai-zeta.vercel.app)

## Features

*   **AI-powered emergency analysis**: Utilizes Google Gemini AI to interpret user input and assess emergency situations.
*   **Emergency guidance and response suggestions**: Provides immediate, actionable advice based on the analyzed emergency.
*   **Nearby hospital search**: Integrates with OpenStreetMap to display the closest medical facilities.
*   **One-click ambulance calling**: Facilitates quick access to emergency services.
*   **Responsive user interface**: Ensures optimal viewing and interaction across various devices.
*   **Error handling for API failures**: Gracefully manages and informs users about issues with external service calls.
*   **MERN architecture**: Built using MongoDB, Express.js, React.js, and Node.js.
*   **Production deployment**: Configured for reliable deployment in a production environment.

## Tech Stack

| Category    | Technology      | Description                                     |
| :---------- | :-------------- | :---------------------------------------------- |
| **Frontend**| React.js        | JavaScript library for building user interfaces |
|             | Vite            | Fast frontend tooling                          |
|             | Tailwind CSS    | Utility-first CSS framework                     |
|             | React Router    | Declarative routing for React                   |
|             | Axios           | Promise-based HTTP client                       |
| **Backend** | Node.js         | JavaScript runtime environment                  |
|             | Express.js      | Web application framework for Node.js           |
| **AI**      | Google Gemini API | Powers the emergency analysis and guidance      |
| **Maps**    | OpenStreetMap Overpass API | Provides geographic data for hospital search |
| **Database**| MongoDB Atlas   | Cloud-hosted NoSQL database                     |
| **Deployment**| Vercel          | Frontend hosting and deployment                 |
|             | Render          | Backend hosting and deployment                  |

## Project Architecture

```
React Frontend
        │
        ▼
Express Backend
      ├────────► Gemini AI API
      └────────► OpenStreetMap API
```

## Folder Structure

```
.
├── Backend/
│   ├── src/
│   │   ├── controller/       # Handles API request logic (e.g., authentication)
│   │   ├── models/           # Defines database schemas (e.g., User)
│   │   ├── services/         # Contains business logic and external API calls (e.g., hospitalService)
│   │   └── index.js          # Main entry point for the Express server
│   └── package.json          # Backend dependencies and scripts
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Images and other media
│   │   ├── components/       # Reusable UI components (e.g., ChatBox, HeroSection)
│   │   ├── services/         # Frontend API interaction logic (e.g., chatService)
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point for React application
│   ├── package.json          # Frontend dependencies and scripts
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── vite.config.js        # Vite build configuration
│   └── vercel.json           # Vercel deployment configuration
└── README.md                 # Project documentation
```

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ankitkandwal-git/LifeLineAI.git
    cd LifeLineAI
    ```

2.  **Install dependencies:**
    Navigate to both `frontend` and `Backend` directories and install their respective dependencies.

    ```bash
    # For frontend
    cd frontend
    npm install

    # For backend
    cd ../Backend
    npm install
    ```

3.  **Frontend Setup:**
    Create a `.env` file in the `frontend` directory and add your API URL:
    ```
    VITE_API_URL=http://localhost:5000/api
    ```
    (Replace `http://localhost:5000/api` with your backend's URL if it's deployed elsewhere).

4.  **Backend Setup:**
    Create a `.env` file in the `Backend` directory and add your environment variables:
    ```
    PORT=5000
    MONGO_URL=your_mongodb_connection_string
    GEMINI_API_KEY=your_google_gemini_api_key
    JWT_SECRET=your_jwt_secret_key
    ```
    (Ensure `JWT_SECRET` is a strong, random string for production).

5.  **Run the application:**
    Start both the frontend and backend servers.

    ```bash
    # In the frontend directory
    npm run dev

    # In the Backend directory
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173` (or similar), and the backend on `http://localhost:5000`.

## Environment Variables

### Frontend

*   `VITE_API_URL`: The base URL for the backend API.

### Backend

*   `PORT`: The port on which the Express server will run (e.g., `5000`).
*   `MONGO_URL`: The connection string for your MongoDB Atlas database.
*   `GEMINI_API_KEY`: Your API key for accessing the Google Gemini AI service.
*   `JWT_SECRET`: A secret key used for signing and verifying JSON Web Tokens (JWTs) for authentication.

## API Endpoints

### `POST /api/chat`

*   **Description**: Sends a user's emergency description to the AI for analysis and receives guidance.
*   **Request Body**:
    ```json
    {
        "message": "string"
    }
    ```
*   **Response**: Contains the AI's summary and potentially emergency data.

### `GET /api/hospitals`

*   **Description**: Retrieves a list of nearby hospitals based on provided geographical coordinates.
*   **Query Parameters**:
    *   `latitude`: The user's current latitude.
    *   `longitude`: The user's current longitude.
*   **Response**: A JSON array of hospital objects, including names and addresses.

## Screenshots

### Home Page
!Home Page Screenshot Placeholder

### AI Chat Interface
!AI Chat Interface Screenshot Placeholder

### Emergency Response Panel
!Emergency Response Panel Screenshot Placeholder

### Nearby Hospitals
!Nearby Hospitals Screenshot Placeholder

## Deployment

The frontend of LifeLineAI is deployed on Vercel, providing fast and reliable hosting. The backend API is deployed on Render. React Router refresh is configured using `vercel.json` rewrites to ensure proper client-side routing on Vercel.

## Author

**Ankit Kandwal**
*   GitHub: https://github.com/ankitkandwal-git

## License

This project is licensed under the MIT License. See the LICENSE file for details.
