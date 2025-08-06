import { Text } from '@cballevre/kiwi-ui';
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
    <div>
      <div className="flex flex-row flex-wrap gap-4">
        <FormField
          label="Date"
          name="date"
          namespace={namespace}
          type="date"
          error={!!errors[namespace]}
          errors={errors}
          register={register}
          required
        />
        <FormField
          label="Heure"
          name="time"
          namespace={namespace}
          type="time"
          error={!!errors[namespace]}
          errors={errors}
          register={register}
          required
        />
        <FormField
          label="Hauteur"
          name="height"
          namespace={namespace}
          type="number"
          step={0.01}
          min={0}
          max={20}
          htmlsize={4}
          error={!!errors[namespace]}
          errors={errors}
          register={register}
          required
        />
      </div>
      {errors[namespace]?.message ? (
        <Text className="text-sm text-red-500">
          {String(errors[namespace]?.message)}
        </Text>
      ) : null}
    </div>
  );
};

export { TideElementField };
