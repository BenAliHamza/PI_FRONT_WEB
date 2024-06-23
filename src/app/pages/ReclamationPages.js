import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ReclamationForm from '../components/ReclamationForm';
import ReclamationDisplay from '../components/ReclamationDisplay';
import ReclamationList from '../components/ReclamationList';

const ReclamationPage = () => {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);

  // Simuler la récupération des données de réclamation
  useEffect(() => {
    // Remplacer par un appel API réel pour récupérer les réclamations
    const fetchReclamations = async () => {
      const data = [
        {
          id: 1,
          titre: 'Example Reclamation 1',
          description: 'This is an example description of a reclamation.',
          createdAt: new Date(),
          status: 'OPEN',
          response: null
        },
        {
          id: 2,
          titre: 'Example Reclamation 2',
          description: 'This is another example description of a reclamation.',
          createdAt: new Date(),
          status: 'CLOSED',
          response: 'This is a response.'
        }
      ];
      setReclamations(data);
    };

    fetchReclamations();
  }, []);

  const handleReclamationSubmit = (newReclamation) => {
    const newReclamationWithId = {
      ...newReclamation,
      id: reclamations.length + 1,
      createdAt: new Date(),
      status: 'OPEN',
      response: null
    };
    setReclamations([...reclamations, newReclamationWithId]);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Gestion des Réclamations
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ReclamationForm onSubmit={handleReclamationSubmit} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReclamationList reclamations={reclamations} onSelectReclamation={setSelectedReclamation} />
        </Grid>
      </Grid>
      {selectedReclamation && (
        <ReclamationDisplay reclamation={selectedReclamation} />
      )}
    </Container>
  );
};

export default ReclamationPage;