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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reclamation);
    setReclamation({ titre: '', description: '' });
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