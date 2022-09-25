import { useFormikContext } from 'formik';
import React from 'react';
import { TideElement } from '../../models/tide';
import { DATE, TIME, HEIGHT } from './fieldsNames';
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

interface Props {
  namespace: string;
}

interface Fields {
  start: TideElement;
  end: TideElement;
}

const TideElementField: React.FC<Props> = ({ namespace }) => {
  const withNamespace = (fieldName: string): string =>
    namespace !== '' ? `${namespace}.${fieldName}` : fieldName;

  const formik = useFormikContext<Fields>();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      mt={2}
    >
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          name={withNamespace(DATE)}
          type="date"
          value={formik.values[namespace as keyof Fields].date}
          onChange={formik.handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Heure</FormLabel>
        <Input
          name={withNamespace(TIME)}
          type="time"
          value={formik.values[namespace as keyof Fields].time}
          onChange={formik.handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Hauteur</FormLabel>
        <Input
          name={withNamespace(HEIGHT)}
          variant="outlined"
          type="number"
          step="0.01"
          value={formik.values[namespace as keyof Fields].height}
          onChange={formik.handleChange}
        />
      </FormControl>
    </Stack>
  );
};

export default TideElementField;
