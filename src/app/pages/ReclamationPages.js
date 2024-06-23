import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ReclamationForm from '../components/ReclamationForm';
import ReclamationDisplay from '../components/ReclamationDisplay';
import ReclamationList from '../components/ReclamationList';

const ReclamationPage = () => {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);

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
    };

    fetchReclamations();
  }, []);

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
  };

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Gestion des Réclamations
      </Typography>
      <ReclamationForm onSubmit={handleReclamationSubmit} />
      <ReclamationList reclamations={reclamations} onSelectReclamation={setSelectedReclamation} />
      {selectedReclamation && <ReclamationDisplay reclamation={selectedReclamation} />}
    </Container>
  );
};

export default ReclamationPage;