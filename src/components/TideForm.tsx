import { Button, Divider, Form, SegmentedControl } from '@cballevre/kiwi-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { type Dayjs } from 'dayjs';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TideElementField } from '@/components/TideElementForm';
import type { Tide } from '@/models/tide';

interface TideFormProps {
  onSubmit: (data: Tide) => void;
}

const schema = z
  .object({
    isRising: z.number(),
    start: z
      .object({
        date: z.iso.date(),
        time: z.iso.time(),
        height: z.number(),
      })
      .required(),
    end: z
      .object({
        date: z.iso.date(),
        time: z.iso.time(),
        height: z.number(),
      })
      .required(),
  })
  .refine(
    (data) => {
      const start = dayjs(`${data.start.date} ${data.start.time}`);
      const end = dayjs(`${data.end.date} ${data.end.time}`);
      return end.isAfter(start);
    },
    {
      message:
        "La date et l'heure de fin doivent être postérieures à celles de début.",
      path: ['end'],
    },
  )
  .refine(
    (data) =>
      data.isRising === 0 ? data.start.height > data.end.height : true,
    {
      message:
        'La hauteur de la marée haute doit être supérieur à celle de la marée basse.',
      path: ['start'],
    },
  )
  .refine(
    (data) =>
      data.isRising === 1 ? data.start.height < data.end.height : true,
    {
      message:
        'La hauteur de la marée basse doit être inférieur à celle de la marée haute.',
      path: ['start'],
    },
  );

type TideFormValues = z.infer<typeof schema>;

const TideForm: React.FC<TideFormProps> = ({ onSubmit }) => {
  const methods = useForm<TideFormValues>({
    defaultValues: {
      isRising: 1,
      start: {
        date: dayjs().format('YYYY-MM-DD'),
        time: dayjs().format('HH:mm'),
        height: 0,
      },
      end: {
        date: dayjs().format('YYYY-MM-DD'),
        time: dayjs().add(6, 'hours').format('HH:mm'),
        height: 0,
      },
    },
    resolver: zodResolver(schema),
  });
  const { watch, handleSubmit, control } = methods;

  const onFormSubmit = (data: TideFormValues): void => {
    const startingAt: Dayjs = dayjs(`${data.start.date} ${data.start.time}`);
    const endingAt: Dayjs = dayjs(`${data.end.date} ${data.end.time}`);
    const duration: number = Math.abs(startingAt.diff(endingAt, 'minutes'));

    onSubmit({
      ...data,
      duration,
      hour: Math.abs(duration / 6),
      range: Math.abs(data.end.height - data.start.height),
    });
  };

  return (
    <FormProvider {...methods}>
      <Form
        className="mb-6 p-6 flex flex-col gap-4 items-start border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Controller
          render={({ field }) => (
            <SegmentedControl
              label="Type de marée"
              options={[
                {
                  label: 'BM',
                  value: 1,
                },
                {
                  label: 'PM',
                  value: 0,
                },
              ]}
              {...field}
            />
          )}
          control={control}
          name="isRising"
        />
        <TideElementField namespace="start" />
        <Divider
          label={watch('isRising') === 1 ? 'PM' : 'BM'}
          position="start"
        />
        <TideElementField namespace="end" />
        <Button label="Calculer" type="submit" />
      </Form>
    </FormProvider>
  );
};

export { TideForm };
