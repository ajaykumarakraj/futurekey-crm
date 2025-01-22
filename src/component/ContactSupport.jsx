import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormHelperText } from '@mui/material';

const ContactSupport = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      setError('Please enter a message.');
      return;
    }
    // Call to API or backend to submit the support message (not implemented here)
    alert('Your message has been sent to support.');
    setMessage('');
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h5" gutterBottom>
        Contact Support
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          required
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactSupport;
