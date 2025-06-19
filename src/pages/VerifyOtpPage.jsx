import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Container,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../component/api';
import { useAuth } from '../component/AuthContext'; // ✅ import context
import axios from 'axios';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const mobile = location.state?.mobile;

    const { login } = useAuth(); // ✅ use auth context

    if (!mobile) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://api.almonkdigital.in/api/verify-login-otp', { mobile, otp });

            if (res.data.status === 200) {
                const token = res.data.token;
                const user = res.data.data;

                // ✅ update AuthContext
                login({ user, token });

                // Optional: Save to localStorage too for persistence
                localStorage.setItem('authToken', token);
                localStorage.setItem('userData', JSON.stringify(user));

                navigate('/dashboard'); // ✅ redirect
            } else {
                setError(res.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError('Error verifying OTP');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                Verify OTP
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                OTP sent to: <strong>{mobile}</strong>
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    margin="normal"
                    required
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Verify
                </Button>
            </form>
        </Container>
    );
};

export default VerifyOtpPage;
