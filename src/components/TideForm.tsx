import {
	Box,
	Button,
	HStack,
	NativeSelect,
	Separator,
	Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { type Dayjs } from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import type { Tide } from "../models/tide";
import { TideElementField } from "./TideElementForm";

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
			path: ["end"],
		},
	)
	.refine(
		(data) =>
			data.isRising === 0 ? data.start.height > data.end.height : true,
		{
			message:
				"La hauteur de la marée haute doit être supérieur à celle de la marée basse.",
			path: ["start"],
		},
	)
	.refine(
		(data) =>
			data.isRising === 1 ? data.start.height < data.end.height : true,
		{
			message:
				"La hauteur de la marée basse doit être inférieur à celle de la marée haute.",
			path: ["start"],
		},
	);

type TideFormValues = z.infer<typeof schema>;

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
		resolver: zodResolver(schema),
	});
	const { watch, register, handleSubmit } = methods;

	const onFormSubmit = (data: TideFormValues): void => {
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

export { TideForm };
