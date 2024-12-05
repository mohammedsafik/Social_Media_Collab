import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import { INSTAGRAM_CONFIG } from '../config';

const SocialMediaScheduler = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [postData, setPostData] = useState({
    platform: 'instagram',
    content: '',
    scheduledTime: '',
    media: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Handle Instagram Authentication
  const handleInstagramLogin = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CONFIG.clientId}&redirect_uri=${INSTAGRAM_CONFIG.redirectUri}&scope=${INSTAGRAM_CONFIG.scope}&response_type=code`;

    // Open Instagram auth in a popup
    window.open(
      authUrl,
      'instagram-auth',
      'width=600,height=600'
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData(prev => ({
        ...prev,
        media: file
      }));
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSchedulePost = async () => {
    if (!authenticated) {
      showSnackbar('Please login to Instagram first', 'error');
      return;
    }

    if (!postData.content || !postData.scheduledTime || !postData.media) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Here you would implement the actual post scheduling logic
      // This will be handled by your Instagram authentication callback
      showSnackbar('Please complete the Instagram authorization', 'info');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Schedule Social Media Post
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                  name="platform"
                  value={postData.platform}
                  onChange={handleChange}
                  disabled
                >
                  <MenuItem value="instagram">Instagram</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {!authenticated && (
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInstagramLogin}
                  >
                    Login with Instagram
                  </Button>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                multiline
                rows={4}
                value={postData.content}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Schedule Time"
                name="scheduledTime"
                type="datetime-local"
                value={postData.scheduledTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().slice(0, 16)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="media-file"
                type="file"
                onChange={handleMediaChange}
              />
              <label htmlFor="media-file">
                <Button variant="outlined" component="span">
                  Upload Media
                </Button>
              </label>
              {postData.media && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {postData.media.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSchedulePost}
                disabled={loading || !authenticated}
              >
                {loading ? <CircularProgress size={24} /> : 'Schedule Post'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SocialMediaScheduler;
