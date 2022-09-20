import { Formik, Form } from 'formik';
import React from 'react';
import Button from '@mui/material/Button/Button';
import { Tide } from '../../models/tide';
import TideElementField from '../TideElementForm/TideElementForm';
import validationSchema from './validationSchema';
import defaultValues from './defaultValues';
import { START } from './fieldsNames';

interface Props {
  onSubmit: (data: Tide) => void;
}

const TideForm: React.FC<Props> = ({ onSubmit }) => {
  const onFormSubmit = (values: any): void => {
    console.log('hello');
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      <Form>
        <TideElementField namespace={START} />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Calculer
        </Button>
      </Form>
    </Formik>
  );
};

export default TideForm;
