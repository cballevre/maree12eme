import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TideForm from './components/TideForm/TideForm';
import { Tide } from './models/tide';
import TideDisplay from './components/TideDisplay/TideDisplay';

const App: React.FC = () => {
  const [tide, setTide] = useState<Tide | null>(null);
  return (
    <Container maxWidth="sm">
      <TideForm onSubmit={(data) => setTide(data)}></TideForm>
      {tide !== null && <TideDisplay tide={tide} />}
    </Container>
  );
};

export default App;
