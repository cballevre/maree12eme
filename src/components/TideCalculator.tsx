import { useState } from 'react';

import { TideDisplay } from '@/components/TideDisplay';
import { TideForm } from '@/components/TideForm';
import type { Tide } from '@/models/tide';

const TideCalculator = () => {
  const [tide, setTide] = useState<Tide | null>(null);

  return (
    <>
      <TideForm onSubmit={(data) => setTide(data)}></TideForm>
      {tide !== null && <TideDisplay tide={tide} />}
    </>
  );
};

export { TideCalculator };
