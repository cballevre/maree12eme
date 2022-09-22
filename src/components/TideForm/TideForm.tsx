import { Formik, Form } from 'formik';
import React from 'react';
import Button from '@mui/material/Button/Button';
import { Tide, TideElement } from '../../models/tide';
import TideElementField from '../TideElementForm/TideElementForm';
import validationSchema from './validationSchema';
import defaultValues from './defaultValues';
import { END, START } from './fieldsNames';
import dayjs, { type Dayjs } from 'dayjs';

interface Props {
  onSubmit: (data: Tide) => void;
}

interface FormValues {
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
      <Form>
        <TideElementField namespace={START} />
        <TideElementField namespace={END} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Calculer
        </Button>
      </Form>
    </Formik>
  );
};

export default TideForm;
