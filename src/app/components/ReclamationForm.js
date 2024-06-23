import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box 
} from '@mui/material';

const ReclamationForm = () => {
  const [reclamation, setReclamation] = useState({
    titre: '',
    description: ''
  });

  const handleChange = (e) => {
    setReclamation({ ...reclamation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your API to create the reclamation
    console.log('Reclamation submitted:', reclamation);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Reclamation
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          name="titre"
          value={reclamation.titre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={reclamation.description}
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
          Submit Reclamation
        </Button>
      </Box>
    </Paper>
  );
};

export default ReclamationForm;