import React from 'react';
import { useParams } from 'react-router-dom';

const ClientDetail = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Client Details</h1>
      <p>Client ID: {id}</p>
      <p>This is a placeholder for the Client Detail page.</p>
    </div>
  );
};

export default ClientDetail;