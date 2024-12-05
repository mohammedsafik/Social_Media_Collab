# Social Media Scheduler Frontend

This is the React frontend for the Social Media Scheduler application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm start
```

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   │   ├── auth/    # Authentication components
│   │   └── ...
│   ├── config/      # Configuration files
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
└── package.json     # Project dependencies
```

## Features

- User Authentication (Login/Signup)
- Protected Routes
- Social Media Post Scheduling
- Instagram Integration
- Material-UI Components
- Responsive Design

## Available Scripts

- `npm start`: Run development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App
