import React from 'react';
import Container from '@mui/material/Container';
import TideForm from './components/TideForm/TideForm';
import { Tide } from './models/tide';

const App: React.FC = () => {
  const handleTideForm = (data: Tide): void => {
    console.log(data);
  };
  return (
    <Container maxWidth="sm">
      <TideForm onSubmit={handleTideForm}></TideForm>
    </Container>
  );
};

export default App;
