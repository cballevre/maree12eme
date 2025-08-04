import {
	Box,
	Button,
	HStack,
	NativeSelect,
	Separator,
	Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { type Dayjs } from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import type { Tide } from "../../models/tide";
import TideElementField from "../TideElementForm/TideElementForm";

interface TideFormProps {
	onSubmit: (data: Tide) => void;
}

interface TideFormValues {
	isRising: number;
	start: {
		date: string;
		time: string;
		height: number;
	};
	end: {
		date: string;
		time: string;
		height: number;
	};
}

const schema = yup.object({
	isRising: yup.number().required(),
	start: yup
		.object({
			date: yup.string().required(),
			time: yup.string().required(),
			height: yup.number().required(),
		})
		.required(),
	end: yup
		.object({
			date: yup.string().required(),
			time: yup.string().required(),
			height: yup.number().required(),
		})
		.required(),
});

const TideForm: React.FC<TideFormProps> = ({ onSubmit }) => {
	const methods = useForm<TideFormValues>({
		defaultValues: {
			isRising: 0,
			start: {
				date: dayjs().format("YYYY-MM-DD"),
				time: dayjs().format("HH:mm"),
				height: 0,
			},
			end: {
				date: dayjs().format("YYYY-MM-DD"),
				time: dayjs().add(6, "hours").format("HH:mm"),
				height: 0,
			},
		},
		resolver: yupResolver(schema),
	});
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onFormSubmit = (data: any): void => {
		const startingAt: Dayjs = dayjs(`${data.start.date} ${data.start.time}`);
		const endingAt: Dayjs = dayjs(`${data.end.date} ${data.end.time}`);
		const duration: number = Math.abs(startingAt.diff(endingAt, "minutes"));

		onSubmit({
			...data,
			duration,
			hour: Math.abs(duration / 6),
			range: Math.abs(data.end.height - data.start.height),
		});
	};

	return (
		<FormProvider {...methods}>
			<Box p={6} bg="gray.200" borderRadius={6} mb={6}>
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<NativeSelect.Root variant="subtle" mb={2} width={24}>
						<NativeSelect.Field
							{...register("isRising", {
								valueAsNumber: true,
							})}
						>
							<option value={0}>PM</option>
							<option value={1}>BM</option>
						</NativeSelect.Field>
						<NativeSelect.Indicator />
					</NativeSelect.Root>
					<TideElementField namespace="start" />
					<HStack mb={2}>
						<Text as="b" flexShrink={0}>
							{watch("isRising") === 1 ? "PM" : "BM"}
						</Text>
						<Separator flex="1" borderColor="black" />
					</HStack>
					<TideElementField namespace="end" />
					<Box mt={4}>
						<Button colorPalette="blue" variant="solid" type="submit">
							Calculer
						</Button>
					</Box>
				</form>
			</Box>
		</FormProvider>
	);
};

export default TideForm;
