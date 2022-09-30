import { useFormikContext } from 'formik';
import React from 'react';
import { TideElement } from '../../models/tide';
import { DATE, TIME, HEIGHT } from './fieldsNames';
import {
  FormControl,
  FormLabel,
  Input,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

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
    <Wrap spacing={4} mb={4}>
      <WrapItem>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            variant="filled"
            bg="white"
            name={withNamespace(DATE)}
            type="date"
            value={formik.values[namespace as keyof Fields].date}
            onChange={formik.handleChange}
          />
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl>
          <FormLabel>Heure</FormLabel>
          <Input
            variant="filled"
            bg="white"
            name={withNamespace(TIME)}
            type="time"
            value={formik.values[namespace as keyof Fields].time}
            onChange={formik.handleChange}
          />
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl>
          <FormLabel>Hauteur</FormLabel>
          <Input
            variant="filled"
            bg="white"
            name={withNamespace(HEIGHT)}
            type="number"
            step={0.01}
            min={0}
            max={20}
            htmlSize={4}
            value={formik.values[namespace as keyof Fields].height}
            onChange={formik.handleChange}
          />
        </FormControl>
      </WrapItem>
    </Wrap>
  );
};

export default TideElementField;
