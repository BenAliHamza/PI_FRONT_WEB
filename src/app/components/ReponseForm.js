import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

const ReponseForm = ({ onSubmit }) => {
  const [reponse, setReponse] = useState('');

  const handleChange = (e) => {
    setReponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reponse);
    setReponse('');
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
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
            variant="outlined"
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
      </CardContent>
    </Card>
  );
};

export default ReponseForm;