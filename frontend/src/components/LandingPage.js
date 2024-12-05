import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import InsightsIcon from '@mui/icons-material/Insights';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #9c27b0 30%, #ff1744 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(156, 39, 176, 0.9), rgba(255, 23, 68, 0.9))',
    zIndex: 1,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  background: '#f5f5f5',
  padding: theme.spacing(8, 0),
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  height: '100%',
  background: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      title: 'Growth Analytics',
      description: 'Track your Instagram growth with detailed analytics and insights. Understand your audience better and optimize your content strategy.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFuYWx5dGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      title: 'Audience Insights',
      description: 'Get deep insights into your follower demographics, engagement patterns, and best posting times.',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvY2lhbCUyMG1lZGlhJTIwYW5hbHl0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      title: 'Performance Metrics',
      description: 'Monitor key performance indicators and track your social media success with comprehensive metrics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGFuYWx5dGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom 
            sx={{ fontWeight: 700, mb: 3 }}>
            Grow Your Social Presence
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Advanced analytics and insights to help you understand your audience and grow your Instagram following
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{
              backgroundColor: 'white',
              color: '#9c27b0',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <StatsSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StatCard>
                <Typography variant="h3" color="primary" gutterBottom>
                  100K+
                </Typography>
                <Typography variant="h6">Active Users</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard>
                <Typography variant="h3" color="primary" gutterBottom>
                  50M+
                </Typography>
                <Typography variant="h6">Followers Tracked</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard>
                <Typography variant="h3" color="primary" gutterBottom>
                  98%
                </Typography>
                <Typography variant="h6">Customer Satisfaction</Typography>
              </StatCard>
            </Grid>
          </Grid>
        </Container>
      </StatsSection>

      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Grow?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Join thousands of content creators who are using our platform to grow their Instagram presence
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Start Free Trial
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
