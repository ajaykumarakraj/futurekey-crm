import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormHelperText } from '@mui/material';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;

    // Basic validation
    if (newPassword !== confirmNewPassword) {
      setError('New Password and Confirm Password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    if (currentPassword === '') {
      setError('Please enter your current password.');
      return;
    }

    // Call to API or backend logic to change the password (not implemented here)

    setError('');
    alert('Password changed successfully');
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;
