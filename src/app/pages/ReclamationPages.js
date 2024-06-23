import React, { useState, useEffect } from 'react';

import { Container, Typography, Grid } from '@mui/material';

import { Container, Typography } from '@mui/material';

//main
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

  // Récupération des réclamations depuis votre backend
  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reclamations'); // Endpoint à remplacer avec votre API
        if (!response.ok) {
          throw new Error('Failed to fetch reclamations');
        }
        const data = await response.json();
        setReclamations(data); // Assurez-vous que les données renvoyées correspondent à la structure attendue dans ReclamationList
      } catch (error) {
        console.error('Error fetching reclamations:', error);
      }
// main
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

  const handleReclamationSubmit = async (newReclamation) => {
    try {
      const response = await fetch('http://localhost:8000/api/reclamations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReclamation),
      });
      if (!response.ok) {
        throw new Error('Failed to submit reclamation');
      }
      const data = await response.json();
      setReclamations([...reclamations, data]); // Mettre à jour les réclamations avec la nouvelle réclamation ajoutée
    } catch (error) {
      console.error('Error submitting reclamation:', error);
    }
// main
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

      <ReclamationForm onSubmit={handleReclamationSubmit} />
      <ReclamationList reclamations={reclamations} onSelectReclamation={setSelectedReclamation} />
      {selectedReclamation && <ReclamationDisplay reclamation={selectedReclamation} />}
// main
    </Container>
  );
};

export default ReclamationPage;