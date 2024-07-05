import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

const ReclamationForm = ({ onSubmit }) => {
  const [reclamation, setReclamation] = useState({
    titre: '',
    description: ''
  });

  const handleChange = (e) => {
    setReclamation({ ...reclamation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Abdelhafidh
   // onSubmit(reclamation);
   // setReclamation({ titre: '', description: '' });

    
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
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
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
            variant="outlined"
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
            variant="outlined"
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
      </CardContent>
    </Card>
  );
};

export default ReclamationForm;