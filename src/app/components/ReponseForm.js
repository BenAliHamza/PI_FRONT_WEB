import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const ReponseForm = ({ onSubmit }) => {
  const [reponse, setReponse] = useState('');

  const handleChange = (e) => {
    setReponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reponse);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Submit Response
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Response"
          value={reponse}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Submit Response
        </Button>
      </Box>
    </Paper>
  );
};

export default ReponseForm;