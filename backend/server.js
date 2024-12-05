// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');

// Enable CORS for development purposes (you can configure this for specific origins in production)
app.use(cors());

// Middleware to parse JSON body data
app.use(express.json());

// API endpoint to create a video project
app.post('/api/create-video', async (req, res) => {
  const { title, text, template, backgroundColor, textColor } = req.body;

  const projectData = {
    template: template,
    data: {
      title: title,
      text: text,
      backgroundColor: backgroundColor,
      textColor: textColor
    }
  };

  try {
    // Make a request to the JSON2Video API
    const response = await fetch('https://api.json2video.com/v2/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'iFcEWajqHS8cZXDzltWM93tyKKy7g7SW7Eiqb11l'  // Replace with your actual API key
      },
      body: JSON.stringify(projectData)
    });

    // If the response isn't OK, throw an error
    if (!response.ok) {
      throw new Error('Failed to create video project');
    }

    const data = await response.json();
    res.json(data); // Send the response back to the frontend
  } catch (err) {
    console.error('Error creating video project:', err);
    res.status(500).json({ error: 'Failed to create video project' });
  }
});

// API endpoint to render the video
app.post('/api/render-video', async (req, res) => {
  const { projectId } = req.body;

  try {
    // Start rendering the video
    const renderResponse = await fetch(`https://api.json2video.com/v2/projects/${projectId}/render`, {
      method: 'POST',
      headers: {
        'x-api-key': 'iFcEWajqHS8cZXDzltWM93tyKKy7g7SW7Eiqb11l'  // Replace with your actual API key
      }
    });

    // If the response isn't OK, throw an error
    if (!renderResponse.ok) {
      throw new Error('Failed to start rendering');
    }

    const renderData = await renderResponse.json();
    res.json(renderData); // Send the rendering status back to the frontend
  } catch (err) {
    console.error('Error rendering video:', err);
    res.status(500).json({ error: 'Failed to start rendering' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
