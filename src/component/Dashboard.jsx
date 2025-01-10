// src/component/Dashboard.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography variant="body1">
        This is your dashboard. You can manage all your tasks here.
      </Typography>
    </Box>
  );
};

export default Dashboard;
