// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext'; // ✅ Ensure this exists

import api from '../component/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [data, setData] = useState({});

    useEffect(() => {

        fetchDashboardData();

    }, [user, token]);

    const fetchDashboardData = async () => {
        try {
            console.log("jhfdjhufhjk", user.user_id)
            const res = await api.get(`/get-home-screen-data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.status === 200) {
                setData(res.data.data);
                console.log("test", res.data.data)
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const handleCardClick = (path) => {
        navigate(path);
    };


    const cards = [
        { title: 'New Leads', key: 'new_lead', path: '/leads/table' },
        { title: 'In Process', key: 'in_process', path: '/leads/hot' },
        { title: 'Hot Leads', key: 'hot_lead', path: '/leads/hot' },
        { title: 'Archived Lead', key: 'archived_lead', path: '/table' },
        { title: 'Converted', key: 'converted', path: '/table' },
        { title: 'Hot Lead', key: 'hot_lead', path: '/table' },

        { title: 'Missed Follow Up', key: 'missed_follow_up', path: '/table' },
        { title: 'Scheduled Site Visit', key: "scheduled_site_visit", path: '/table' },
        { title: 'Today Follow Up', key: 'today_follow_up', path: '/table' },
        { title: 'Today Site Visit', key: 'today_site_visit', path: '/table' },
        { title: 'Tomorrow Site Visit', key: 'tomorrow_site_visit', path: '/table' },


        { title: 'Create Lead', key: null, path: '/leads/create' },
        { title: 'Bulk Upload', key: null, path: '/leads/bulk-upload' },
        { title: 'Table View', key: null, path: '/table' },
        { title: 'Support', key: null, path: '/support' },
        { title: 'Change Password', key: null, path: '/change-password' },
    ];
    console.log("User:", user);
    console.log("Token:", token);
    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Grid container spacing={3} justifyContent="center">
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
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
                            onClick={() => handleCardClick(card.path)}
                        >
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" align="center" sx={{ fontSize: '28px' }}>
                                    {card.key ? data[card.key] || 0 : '-'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
