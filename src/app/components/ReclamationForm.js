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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/reclamations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reclamation),
      });

      if (!response.ok) {
        throw new Error('Failed to create reclamation');
      }

      // Réinitialiser le formulaire après soumission réussie
      setReclamation({
        titre: '',
        description: ''
      });

      console.log('Reclamation submitted successfully:', reclamation);
    } catch (error) {
      console.error('Error creating reclamation:', error);
    }
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