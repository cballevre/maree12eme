import React, { useState } from 'react';
import TideForm from './components/TideForm/TideForm';
import { Tide } from './models/tide';
import TideDisplay from './components/TideDisplay/TideDisplay';
import { ChakraProvider, Container } from '@chakra-ui/react';

const App: React.FC = () => {
  const [tide, setTide] = useState<Tide | null>(null);
  return (
    <ChakraProvider>
      <Container maxWidth="sm">
        <h1>Calculateur de marée (règle des douzièmes)</h1>
        <TideForm onSubmit={(data) => setTide(data)}></TideForm>
        {tide !== null && <TideDisplay tide={tide} />}
      </Container>
    </ChakraProvider>
  );
};

export default App;
