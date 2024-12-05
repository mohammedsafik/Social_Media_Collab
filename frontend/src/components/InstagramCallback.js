import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InstagramCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the authorization code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Exchange code for access token
          const response = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.REACT_APP_INSTAGRAM_CLIENT_ID,
              client_secret: process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET,
              grant_type: 'authorization_code',
              redirect_uri: process.env.REACT_APP_INSTAGRAM_REDIRECT_URI,
              code: code,
            }),
          });

          const data = await response.json();
          
          if (data.access_token) {
            // Store the access token
            localStorage.setItem('instagram_access_token', data.access_token);
            localStorage.setItem('instagram_user_id', data.user_id);
            
            // Close the popup and notify the parent window
            if (window.opener) {
              window.opener.postMessage({ type: 'INSTAGRAM_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              navigate('/scheduler');
            }
          }
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          navigate('/scheduler?error=auth_failed');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      Processing Instagram authentication...
    </div>
  );
};

export default InstagramCallback;
