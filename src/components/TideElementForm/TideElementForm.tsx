import { Stack, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { TideElement } from '../../models/tide';
import { DATE, TIME, HEIGHT } from './fieldsNames';

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
      <TextField
        name={withNamespace(DATE)}
        type="date"
        label="Date"
        variant="outlined"
        value={formik.values[namespace as keyof Fields].date}
        onChange={formik.handleChange}
      />
      <TextField
        name={withNamespace(TIME)}
        type="time"
        label="Heure"
        variant="outlined"
        value={formik.values[namespace as keyof Fields].time}
        onChange={formik.handleChange}
      />
      <TextField
        name={withNamespace(HEIGHT)}
        label="Hauteur"
        variant="outlined"
        inputProps={{
          type: 'number',
          step: '0.01',
        }}
        value={formik.values[namespace as keyof Fields].height}
        onChange={formik.handleChange}
      />
    </Stack>
  );
};

export default TideElementField;
