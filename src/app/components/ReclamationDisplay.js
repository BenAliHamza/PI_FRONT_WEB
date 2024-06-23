import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Chip 
} from '@mui/material';

const ReclamationDisplay = ({ reclamation }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Reclamation Details
      </Typography>
      <Box sx={{ mt: 2 }}>
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
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Response
      </Typography>
      {reclamation.response ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            {reclamation.response}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Responded on: {new Date(reclamation.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No response yet.
        </Typography>
      )}
    </Paper>
  );
};

export default ReclamationDisplay;