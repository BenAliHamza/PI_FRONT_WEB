import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ReclamationDisplay from '../components/ReclamationDisplay';
import ReponseForm from '../components/ReponseForm';

const ReponsePage = () => {
  const [reclamation, setReclamation] = useState(null);

  // Simuler la récupération des données de réclamation
  useEffect(() => {
    // Remplacer par un appel API réel
    const fetchReclamation = async () => {
      const data = {
        titre: 'Example Reclamation',
        description: 'This is an example description of a reclamation.',
        createdAt: new Date(),
        status: 'OPEN',
        response: null
      };
      setReclamation(data);
    };

    fetchReclamation();
  }, []);

  const handleReponseSubmit = (newResponse) => {
    // Simuler la soumission de la réponse et mise à jour de la réclamation
    // Remplacer par un appel API réel
    setReclamation(prevReclamation => ({
      ...prevReclamation,
      status: 'CLOSED',
      response: newResponse,
      updatedAt: new Date()
    }));
  };

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Réponse à la Réclamation
      </Typography>
      {reclamation && <ReclamationDisplay reclamation={reclamation} />}
      {reclamation && !reclamation.response && (
        <ReponseForm onSubmit={handleReponseSubmit} />
      )}
    </Container>
  );
};

export default ReponsePage;