import { Input } from '@cballevre/kiwi-ui';
import { forwardRef } from 'react';
import type {
  FieldErrors,
  FieldValues,
  GlobalError,
  UseFormRegister,
} from 'react-hook-form';

interface FormFieldProps {
  label: string;
  required?: boolean;
  namespace?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  error?: string | boolean;
  errors: FieldErrors<FieldValues>;
  // biome-ignore lint/suspicious/noExplicitAny: Allow additional props
  [key: string]: any;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      namespace,
      name,
      register,
      error,
      errors,
      type,
      ...rest
    },
    ref,
  ) => {
    const fieldName = namespace ? `${namespace}.${name}` : name;
    const fieldErrors = namespace
      ? (errors[namespace] as Record<string, GlobalError>)?.[name]
      : errors[name];

    return (
      <Input
        label={label}
        name={fieldName}
        type={type}
        ref={ref}
        {...rest}
        {...register(fieldName, {
          valueAsNumber: type === 'number',
        })}
        error={error ? error : fieldErrors ? fieldErrors.message : undefined}
        required={required}
      />
    );
  },
);

export { FormField };
