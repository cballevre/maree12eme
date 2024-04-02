import { Formik, Form } from 'formik';
import React from 'react';
import { Tide, TideElement } from '../../models/tide';
import TideElementField from '../TideElementForm/TideElementForm';
import validationSchema from './validationSchema';
import defaultValues from './defaultValues';
import { END, START, IS_RISING } from './fieldsNames';
import dayjs, { type Dayjs } from 'dayjs';
import {
  FormControl,
  Select,
  Box,
  Button,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react';

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
        <Box p={6} bg="gray.200" borderRadius={6} mb={6}>
          <Form>
            <FormControl>
              <Select
                variant="filled"
                bg="white"
                name={IS_RISING}
                value={formik.values[IS_RISING]}
                onChange={(evt) => {
                  formik.setFieldValue(
                    "isRising",
                    parseInt(evt.target.value)
                  );
                }}
                mb={2}
                width={24}
              >
                <option value={0}>PM</option>
                <option value={1}>BM</option>
              </Select>
            </FormControl>
            <TideElementField namespace={START} />
            <HStack mb={2}>
              <Text as="b">{formik.values[IS_RISING] === 1 ? 'PM' : 'BM'}</Text>
              <Divider borderColor="black" />
            </HStack>
            <TideElementField namespace={END} />
            <Box mt={4}>
              <Button colorScheme="teal" variant="solid" type="submit">
                Calculer
              </Button>
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default TideForm;
