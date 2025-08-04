import { Fieldset, Wrap, WrapItem } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/FormField';

interface TideElementFieldProps {
  namespace: string;
}

const TideElementField: React.FC<TideElementFieldProps> = ({ namespace }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Fieldset.Root invalid={!!errors[namespace]} mb={4}>
      <Fieldset.Content>
        <Wrap gap={4}>
          <WrapItem>
            <FormField
              label="Date"
              name="date"
              namespace={namespace}
              type="date"
              errors={errors}
              register={register}
              required
            />
          </WrapItem>
          <WrapItem>
            <FormField
              label="Heure"
              name="time"
              namespace={namespace}
              type="time"
              errors={errors}
              register={register}
              required
            />
          </WrapItem>
          <WrapItem>
            <FormField
              label="Hauteur"
              name="height"
              namespace={namespace}
              type="number"
              step={0.01}
              min={0}
              max={20}
              htmlSize={4}
              errors={errors}
              register={register}
              required
            />
          </WrapItem>
        </Wrap>
      </Fieldset.Content>
      {errors[namespace] ? (
        <Fieldset.ErrorText>{errors[namespace].message}</Fieldset.ErrorText>
      ) : null}
    </Fieldset.Root>
  );
};

export { TideElementField };
