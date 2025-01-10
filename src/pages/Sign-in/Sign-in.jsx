import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Grid, Box, Typography, Container, Paper, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../component/AuthContext'; // Import the auth context

const SignInPage = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = (event) => {
    event.preventDefault();

    // Hardcoded credentials (can replace with API call)
    const validEmail = 'testuser@example.com';
    const validPassword = 'TestPassword123';

    if (email === validEmail && password === validPassword) {
      setError('');
      login(); // Mark the user as logged in
      navigate('/dashboard'); // Redirect to the dashboard after login
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ marginTop: '50px', padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign In</Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField label="Email Address" variant="outlined" fullWidth required autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Password" type="password" variant="outlined" fullWidth required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
          <FormControlLabel control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} color="primary" />} label="Remember me" sx={{ mb: 2 }} />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mb: 2, padding: '12px', fontSize: '16px', textTransform: 'none', borderRadius: '20px', boxShadow: 2, '&:hover': { backgroundColor: 'primary.dark' } }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" color="primary">Forgot password?</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;
