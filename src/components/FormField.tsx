import { Field, Input } from "@chakra-ui/react";
import type { FC } from "react";
import type {
	FieldErrors,
	FieldValues,
	GlobalError,
	UseFormRegister,
} from "react-hook-form";

interface FormFieldProps {
	label: string;
	required?: boolean;
	namespace?: string;
	name: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	// biome-ignore lint/suspicious/noExplicitAny: Allow additional props
	[key: string]: any;
}

const FormField: FC<FormFieldProps> = ({
	label,
	required = false,
	namespace,
	name,
	register,
	errors,
	type,
	...rest
}) => {
	const fieldName = namespace ? `${namespace}.${name}` : name;
	const fieldErrors = namespace
		? (errors[namespace] as Record<string, GlobalError>)?.[name]
		: errors[name];

	return (
		<Field.Root
			required={required}
			invalid={
				!!fieldErrors || (namespace !== undefined && !!errors[namespace])
			}
		>
			<Field.Label>
				{label} {required ? <Field.RequiredIndicator /> : null}
			</Field.Label>
			<Input
				{...register(fieldName, {
					valueAsNumber: type === "number",
				})}
				type={type}
				variant="subtle"
				{...rest}
			/>
			{fieldErrors ? (
				<Field.ErrorText>{fieldErrors.message}</Field.ErrorText>
			) : null}
		</Field.Root>
	);
};

export { FormField };
