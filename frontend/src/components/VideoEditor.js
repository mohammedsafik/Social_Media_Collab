import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

const VideoEditor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    template: 'business1',
    backgroundColor: '#ffffff',
    textColor: '#000000'
  });

  const templates = [
    'business1',
    'business2',
    'promo1',
    'social1',
    'social2'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateVideo = async () => {
    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const projectData = {
        template: formData.template,
        data: {
          title: formData.title,
          text: formData.text,
          backgroundColor: formData.backgroundColor,
          textColor: formData.textColor
        }
      };

      // Create project via backend
      const createResponse = await fetch('http://localhost:5000/api/create-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create video project');
      }

      const { project } = await createResponse.json();

      // Start rendering the video via backend
      const renderResponse = await fetch('http://localhost:5000/api/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId: project.id })
      });

      if (!renderResponse.ok) {
        throw new Error('Failed to start rendering');
      }

      // Poll for video rendering status
      const checkStatus = async () => {
        const statusResponse = await fetch(`http://localhost:5000/api/check-status/${project.id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!statusResponse.ok) {
          throw new Error('Failed to check status');
        }

        const status = await statusResponse.json();

        if (status.project.status === 'done') {
          setVideoUrl(status.project.video_url);
          setLoading(false);
        } else if (status.project.status === 'failed') {
          throw new Error('Video rendering failed');
        } else {
          setTimeout(checkStatus, 5000); // Check again in 5 seconds
        }
      };

      await checkStatus();
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <MovieIcon sx={{ mr: 1 }} />
          AI Video Creator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Text Content"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              multiline
              rows={4}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Template</InputLabel>
              <Select
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                label="Template"
              >
                {templates.map(template => (
                  <MenuItem key={template} value={template}>
                    {template}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Background Color"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleInputChange}
              margin="normal"
              type="color"
            />

            <TextField
              fullWidth
              label="Text Color"
              name="textColor"
              value={formData.textColor}
              onChange={handleInputChange}
              margin="normal"
              type="color"
            />

            <Button
              variant="contained"
              onClick={handleCreateVideo}
              disabled={loading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Video'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {videoUrl && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Generated Video
                </Typography>
                <video
                  controls
                  width="100%"
                  src={videoUrl}
                  style={{ maxHeight: '300px' }}
                />
                <Button
                  variant="outlined"
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Download Video
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VideoEditor;
