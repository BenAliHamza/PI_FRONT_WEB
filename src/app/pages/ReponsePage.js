import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ReclamationDisplay from '../components/ReclamationDisplay';
import ReponseForm from '../components/ReponseForm';
import ReponseList from '../components/ReponseList';
import ReclamationForm from '../components/ReclamationForm';
import ReclamationList from '../components/ReclamationList';

const ReponsePage = () => {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [response, setResponse] = useState(null);

  // Simulate fetching reclamation data
  useEffect(() => {
    // Replace with actual API call
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
    // Simulate submitting the new reclamation and updating the list
    // Replace with actual API call
    const newReclamationWithId = {
      ...newReclamation,
      id: reclamations.length + 1,
      createdAt: new Date(),
      status: 'OPEN',
      response: null
    };
    setReclamations([...reclamations, newReclamationWithId]);
  };

  const handleReponseSubmit = (newResponse) => {
    // Simulate submitting the response and updating the reclamation
    // Replace with actual API call
    setResponse(newResponse);
    setSelectedReclamation(prevReclamation => ({
      ...prevReclamation,
      status: 'CLOSED',
      response: newResponse,
      updatedAt: new Date()
    }));
  };

  return (
    <Container>
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Gestion des Réclamations
      </Typography>
      <ReclamationForm onSubmit={handleReclamationSubmit} />
      <ReclamationList reclamations={reclamations} />
      {selectedReclamation && <ReclamationDisplay reclamation={selectedReclamation} />}
      {selectedReclamation && !selectedReclamation.response && (
        <ReponseForm onSubmit={handleReponseSubmit} />
      )}
      {selectedReclamation && <ReponseList reclamationId={selectedReclamation.id} />}
    </Container>
  );
};

export default ReponsePage;