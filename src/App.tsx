import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TideForm from './components/TideForm/TideForm';
import { Tide } from './models/tide';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  const [tide, setTide] = useState<Tide | null>(null);
  return (
    <Container maxWidth="sm">
      <TideForm onSubmit={(data) => setTide(data)}></TideForm>
      {tide !== null && <Box>Hello j&apos;ai fini de calculer</Box>}
    </Container>
  );
};

export default App;
