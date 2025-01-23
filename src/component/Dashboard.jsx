import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material'; // Ensure Box is imported

const Dashboard = ({ onCardClick }) => {
  const handleCardClick = (component) => {
    onCardClick(component); // Notify parent about selected component
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#003961',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => handleCardClick('LeadsTable')}
          >
            <CardContent>
              <Typography variant="h5" align="center">
                New Leads
              </Typography>
              <Typography variant="body2" align="center" sx={{ fontSize: '30px' }}>
                7687
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
