import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
    gender: '',
    city: '',
    requirement: '',
    leadSource: '',
    customerType: '',
    project: '',
    remark: '',
    teamLeader: '',
    agent: ''
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
    console.log('Form submitted with data:', formData);
    setIsSubmitted(true); // Set submitted state to true
  };

  return (
    <Box sx={{ margin: '0 auto', padding: '20px', maxWidth: '800px' }}> {/* Decreased maxWidth */}
      {isSubmitted ? (
        <Typography variant="h6" color="primary" textAlign="center" sx={{ fontSize: '0.875rem' }}>
          Thank you for your submission!
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <Paper sx={{ padding: 3, marginBottom: 3 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Personal Details
            </Typography>
            <Grid container spacing={2}> {/* Reduced spacing */}
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }} // Smaller label
                  inputProps={{ style: { fontSize: '0.75rem' } }} // Smaller input text
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }} // Smaller label
                  inputProps={{ style: { fontSize: '0.75rem' } }} // Smaller input text
                />
              </Grid>
            </Grid>

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
              size="small"
              InputLabelProps={{ style: { fontSize: '0.75rem' } }} // Smaller label
              inputProps={{ style: { fontSize: '0.75rem' } }} // Smaller input text
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
              size="small"
              InputLabelProps={{ style: { fontSize: '0.75rem' } }} // Smaller label
              inputProps={{ style: { fontSize: '0.75rem' } }} // Smaller input text
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Gender</InputLabel> {/* Smaller label */}
                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }} // Smaller select text
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>City</InputLabel> {/* Smaller label */}
                  <Select
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }} // Smaller select text
                  >
                    <MenuItem value="City 1">City 1</MenuItem>
                    <MenuItem value="City 2">City 2</MenuItem>
                    <MenuItem value="City 3">City 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Lead Details Section */}
          <Paper sx={{ padding: 3, marginBottom: 3 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Lead Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Requirement</InputLabel>
                  <Select
                    label="Requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="Requirement 1">Requirement 1</MenuItem>
                    <MenuItem value="Requirement 2">Requirement 2</MenuItem>
                    <MenuItem value="Requirement 3">Requirement 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Lead Source</InputLabel>
                  <Select
                    label="Lead Source"
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="Lead Source 1">Lead Source 1</MenuItem>
                    <MenuItem value="Lead Source 2">Lead Source 2</MenuItem>
                    <MenuItem value="Lead Source 3">Lead Source 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Customer Type</InputLabel>
                  <Select
                    label="Customer Type"
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Returning">Returning</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Project</InputLabel>
                  <Select
                    label="Project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="Project 1">Project 1</MenuItem>
                    <MenuItem value="Project 2">Project 2</MenuItem>
                    <MenuItem value="Project 3">Project 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              label="Remark"
              variant="outlined"
              fullWidth
              margin="normal"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              required
              multiline
              rows={2}
              size="small"
              InputLabelProps={{ style: { fontSize: '0.75rem' } }} // Smaller label
              inputProps={{ style: { fontSize: '0.75rem' } }} // Smaller input text
            />
          </Paper>

          {/* Additional Information Section */}
          <Paper sx={{ padding: 3 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Additional Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Team Leader</InputLabel>
                  <Select
                    label="Team Leader"
                    name="teamLeader"
                    value={formData.teamLeader}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="Leader 1">Leader 1</MenuItem>
                    <MenuItem value="Leader 2">Leader 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel sx={{ fontSize: '0.75rem' }}>Agent</InputLabel>
                  <Select
                    label="Agent"
                    name="agent"
                    value={formData.agent}
                    onChange={handleChange}
                    required
                    sx={{ fontSize: '0.75rem' }}
                  >
                    <MenuItem value="Agent 1">Agent 1</MenuItem>
                    <MenuItem value="Agent 2">Agent 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" type="submit" size="large">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default FormComponent;
