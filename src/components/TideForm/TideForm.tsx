import { Formik, Form } from 'formik';
import React from 'react';
import Button from '@mui/material/Button/Button';
import { Tide, TideElement } from '../../models/tide';
import TideElementField from '../TideElementForm/TideElementForm';
import validationSchema from './validationSchema';
import defaultValues from './defaultValues';
import { END, START, IS_RISING } from './fieldsNames';
import dayjs, { type Dayjs } from 'dayjs';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
  onSubmit: (data: Tide) => void;
}

interface FormValues {
  isRising: boolean;
  start: TideElement;
  end: TideElement;
}

const TideForm: React.FC<Props> = ({ onSubmit }) => {
  const onFormSubmit = (values: FormValues): void => {
    const startingAt: Dayjs = dayjs(
      `${values.start.date} ${values.start.time}`
    );
    const endingAt: Dayjs = dayjs(`${values.end.date} ${values.end.time}`);
    const duration: number = Math.abs(startingAt.diff(endingAt, 'minutes'));

    onSubmit({
      ...values,
      duration,
      hour: Math.abs(duration / 6),
      range: Math.abs(values.end.height - values.start.height),
    });
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {(formik) => (
        <Form>
          <FormControl>
            <InputLabel id="starting-type-label">Type</InputLabel>
            <Select
              labelId="starting-type-label"
              name={IS_RISING}
              label="Type"
              value={formik.values[IS_RISING]}
              onChange={formik.handleChange}
            >
              <MenuItem value={false as any}>PM</MenuItem>
              <MenuItem value={true as any}>BM</MenuItem>
            </Select>
          </FormControl>
          <TideElementField namespace={START} />
          <p>{formik.values[IS_RISING] ? 'PM' : 'BM'}</p>
          <TideElementField namespace={END} />
          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Calculer
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TideForm;
