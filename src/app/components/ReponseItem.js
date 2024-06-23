import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ReponseItem = ({ reponse }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6">Response</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {reponse.text}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Responded on: {new Date(reponse.createdAt).toLocaleDateString()}
      </Typography>
    </Paper>
  );
};

export default ReponseItem;