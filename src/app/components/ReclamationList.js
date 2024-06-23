import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';

const ReclamationList = ({ reclamations, onSelectReclamation }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {reclamations.map((reclamation) => (
        <Paper
          key={reclamation.id}
          elevation={3}
          sx={{ p: 3, mb: 2, cursor: 'pointer' }}
          onClick={() => onSelectReclamation(reclamation)}
        >
          <Typography variant="h6">{reclamation.titre}</Typography>
          <Typography variant="body2" color="text.secondary">
            Created on: {new Date(reclamation.createdAt).toLocaleDateString()}
          </Typography>
          <Chip 
            label={reclamation.status} 
            color={reclamation.status === 'OPEN' ? 'error' : 'success'} 
            size="small" 
            sx={{ mt: 1 }}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {reclamation.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ReclamationList;