import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    setIsSubmitted(true); // Set submitted state to true
  };

  return (
    <Box sx={{ width: '400px', margin: '0 auto', padding: '20px', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Contact Form
      </Typography>

      {isSubmitted ? (
        <Typography variant="h6" color="primary">
          Thank you for your submission!
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default FormComponent;
