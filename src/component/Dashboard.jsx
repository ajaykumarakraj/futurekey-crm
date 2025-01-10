import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  const boxData = [
    { title: "Tasks", description: "View and manage your tasks." },
    { title: "Reports", description: "Analyze your progress with reports." },
    { title: "Messages", description: "Check your messages and notifications." },
    { title: "Settings", description: "Customize your dashboard settings." },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {boxData.map((box, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
              >
                {box.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                {box.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
