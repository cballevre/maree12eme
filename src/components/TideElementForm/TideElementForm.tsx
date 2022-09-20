import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { TideElement } from '../../models/tide';
import { DATE, TIME, HEIGHT, TYPE } from './fieldsNames';

interface Props {
  namespace: string;
}

interface Fields {
  start: TideElement;
}

const TideElementField: React.FC<Props> = ({ namespace }) => {
  const withNamespace = (fieldName: string): string =>
    namespace !== '' ? `${namespace}.${fieldName}` : fieldName;

  const formik = useFormikContext<Fields>();

  return (
    <Box mt={2}>
      <FormControl>
        <InputLabel id="starting-type-label">Type</InputLabel>
        <Select
          labelId="starting-type-label"
          name={withNamespace(TYPE)}
          label="Type"
          value={formik.values.start.type}
          onChange={formik.handleChange}
        >
          <MenuItem value={1}>PM</MenuItem>
          <MenuItem value={0}>BM</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name={withNamespace(DATE)}
        type="date"
        label="Date"
        variant="outlined"
        value={formik.values.start.date}
        onChange={formik.handleChange}
      />
      <TextField
        name={withNamespace(TIME)}
        type="time"
        label="Heure"
        variant="outlined"
        value={formik.values.start.time}
        onChange={formik.handleChange}
      />
      <TextField
        name={withNamespace(HEIGHT)}
        label="Hauteur"
        variant="outlined"
        inputProps={{
          inputMode: 'decimal',
          pattern: '[0-9]{0,2}[.,][0-9]{0,2}',
          step: '0.01',
        }}
        value={formik.values.start.height}
        onChange={formik.handleChange}
      />
    </Box>
  );
};

export default TideElementField;
