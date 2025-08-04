import { Box, Stack, Switch, Text } from '@chakra-ui/react';
import { type FC, useState } from 'react';

import { TideChartDisplay } from '@/components/TideChartDisplay';
import { TideTableDisplay } from '@/components/TideTableDisplay';
import type { Tide } from '@/models/tide';
import { generateTideFragments } from '@/utils/generateTideFragments';

interface TideDisplayProps {
  tide: Tide;
}

const TideDisplay: FC<TideDisplayProps> = ({ tide }) => {
  const [displayType, setDisplayType] = useState<boolean>(true);

  const data = generateTideFragments(tide);

  return (
    <Box>
      <Stack direction="row" gap={1} alignItems="center" mb={4}>
        <Text>Graphique</Text>
        <Switch.Root
          colorPalette="orange"
          checked={displayType}
          onChange={() => setDisplayType(!displayType)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
        <Text>Liste</Text>
      </Stack>
      {displayType ? (
        <TideChartDisplay rows={data} />
      ) : (
        <TideTableDisplay rows={data} />
      )}
    </Box>
  );
};

export { TideDisplay };
