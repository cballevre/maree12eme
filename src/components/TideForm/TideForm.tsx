import { Formik, Form } from 'formik';
import React from 'react';
import { Tide, TideElement } from '../../models/tide';
import TideElementField from '../TideElementForm/TideElementForm';
import validationSchema from './validationSchema';
import defaultValues from './defaultValues';
import { END, START, IS_RISING } from './fieldsNames';
import dayjs, { type Dayjs } from 'dayjs';
import { FormControl, FormLabel, Select, Box, Button } from '@chakra-ui/react';

interface Props {
  onSubmit: (data: Tide) => void;
}

interface FormValues {
  isRising: number;
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
            <FormLabel>Type</FormLabel>
            <Select
              name={IS_RISING}
              value={formik.values[IS_RISING]}
              onChange={formik.handleChange}
              placeholder="Select option"
            >
              <option value={0}>PM</option>
              <option value={1}>BM</option>
            </Select>
          </FormControl>
          <TideElementField namespace={START} />
          <p>{formik.values[IS_RISING] === 1 ? 'PM' : 'BM'}</p>
          <TideElementField namespace={END} />
          <Box mt={2}>
            <Button color="primary" variant="contained" type="submit">
              Calculer
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TideForm;
