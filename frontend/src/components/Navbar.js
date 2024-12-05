import React from 'react';
import { AppBar, Toolbar, Container, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              component={Link}
              to="/"
            >
              Home
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<DashboardIcon />}
              component={Link}
              to="/dashboard"
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              startIcon={<InstagramIcon />}
              component={Link}
              to="/instagram"
            >
              Instagram
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SmartToyIcon />}
              component={Link}
              to="/ai-help"
              sx={{
                ml: 2,
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                }
              }}
            >
              AI Help
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
