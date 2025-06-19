import React, { useState } from 'react';
import { Button, Box, Typography, Paper, Grid, LinearProgress } from '@mui/material';

function WalkUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);

      // Simulating file upload with progress
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(interval);
            setIsUploading(false);
            alert('File uploaded successfully!');
            return 100;
          }
          return Math.min(prevProgress + 10, 100);
        });
      }, 500);
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <Box sx={{ margin: '0 auto', padding: '20px', width: '80%', maxWidth: '600px' }}>
      <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          WalkUpload
        </Typography>

        {/* File Upload Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-button"
            accept="image/*, .pdf, .txt, .docx"
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span" color="primary" sx={{ marginBottom: 2 }}>
              Choose File
            </Button>
          </label>
          
          {selectedFile && (
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Selected File: {selectedFile.name}
            </Typography>
          )}

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            sx={{ marginTop: 2 }}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>

          {/* Progress Bar */}
          {isUploading && (
            <Box sx={{ width: '100%', marginTop: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default WalkUpload;
