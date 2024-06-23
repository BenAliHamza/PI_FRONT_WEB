import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ReponseItem from './ReponseItem';

const ReponseList = ({ reclamationId }) => {
  const [reponses, setReponses] = useState([]);

  // Simulate fetching responses data
  useEffect(() => {
    // Replace with actual API call
    const fetchReponses = async () => {
      const data = [
        { id: 1, text: 'This is the first response', createdAt: new Date() },
        { id: 2, text: 'This is the second response', createdAt: new Date() },
        { id: 3, text: 'This is the third response', createdAt: new Date() },
      ];
      setReponses(data);
    };

    fetchReponses();
  }, [reclamationId]);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        List of Responses
      </Typography>
      {reponses.length > 0 ? (
        reponses.map((reponse) => (
          <ReponseItem key={reponse.id} reponse={reponse} />
        ))
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No responses available.
        </Typography>
      )}
    </Container>
  );
};

export default ReponseList;