import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ReclamationDisplay from '../components/ReclamationDisplay';
import ReponseForm from '../components/ReponseForm';

const ReponsePage = () => {
  const [reclamation, setReclamation] = useState(null);
  const [response, setResponse] = useState(null);

  // Simulate fetching reclamation data
  useEffect(() => {
    // Replace with actual API call
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
    // Simulate submitting the response and updating the reclamation
    // Replace with actual API call
    setResponse(newResponse);
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
        Reponse à la Réclamation
      </Typography>
      {reclamation && <ReclamationDisplay reclamation={reclamation} />}
      {reclamation && !reclamation.response && (
        <ReponseForm onSubmit={handleReponseSubmit} />
      )}
    </Container>
  );
};

export default ReponsePage;