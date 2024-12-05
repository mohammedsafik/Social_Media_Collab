# Social Media Scheduler

A full-stack web application for scheduling and managing social media posts.

## Project Structure

The project is divided into two main parts:

```
PEC_FINAL/
├── backend/         # Express + MongoDB backend
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── middleware/  # Custom middleware
│   └── server.js    # Main server file
│
└── frontend/        # React frontend
    ├── public/      # Static files
    └── src/         # Source code
        ├── components/
        ├── config/
        └── App.js
```

## Setup Instructions

1. Backend Setup:
```bash
cd backend
npm install
# Create .env file with required variables
npm run dev
```

2. Frontend Setup:
```bash
cd frontend
npm install
# Create .env file with required variables
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

- User Authentication
- Protected Routes
- Social Media Post Scheduling
- Instagram Integration
- Material-UI Interface
- MongoDB Database
- JWT Authentication
- RESTful API

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler
JWT_SECRET=your_jwt_secret_key_here
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/instagram/callback
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Development

To run both frontend and backend in development mode:

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```
# Social_Media_Collab
