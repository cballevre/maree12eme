import { useFormikContext } from 'formik';
import React from 'react';
import { TideElement } from '../../models/tide';
import { DATE, TIME, HEIGHT } from './fieldsNames';
import {
  Input,
  Wrap,
  WrapItem,
  Field,
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
    <Wrap gap={4} mb={4}>
      <WrapItem>
        <Field.Root>
          <Field.Label>Date</Field.Label>
          <Input
            name={withNamespace(DATE)}
            type="date"
            value={formik.values[namespace as keyof Fields].date}
            onChange={formik.handleChange}
            variant="subtle"
          />
        </Field.Root>
      </WrapItem>
      <WrapItem>
        <Field.Root>
          <Field.Label>Heure</Field.Label>
          <Input
            name={withNamespace(TIME)}
            type="time"
            value={formik.values[namespace as keyof Fields].time}
            onChange={formik.handleChange}
            variant="subtle"
          />
        </Field.Root>
      </WrapItem>
      <WrapItem>
        <Field.Root>
          <Field.Label>Hauteur</Field.Label>
          <Input
            name={withNamespace(HEIGHT)}
            type="number"
            step={0.01}
            min={0}
            max={20}
            htmlSize={4}
            value={formik.values[namespace as keyof Fields].height}
            onChange={formik.handleChange}
            variant="subtle"
          />
        </Field.Root>
      </WrapItem>
    </Wrap>
  );
};

export default TideElementField;
