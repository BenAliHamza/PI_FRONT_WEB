import React from 'react';
import ReclamationForm from '../components/ReclamationForm';
import ReclamationDisplay from '../components/ReclamationDisplay';

const ReclamationPage = () => {
  return (
    <div>
      <h1>Gestion des Réclamations</h1>
      <ReclamationForm />
      <ReclamationDisplay reclamation={/* pass reclamation data here */} />
    </div>
  );
};

export default ReclamationPage;