import { Field, Input, Wrap, WrapItem } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface TideElementFieldProps {
	namespace: string;
}

const TideElementField: React.FC<TideElementFieldProps> = ({ namespace }) => {
	const { register } = useFormContext();

	return (
		<Wrap gap={4} mb={4}>
			<WrapItem>
				<Field.Root>
					<Field.Label>Date</Field.Label>
					<Input
						{...register(`${namespace}.date`)}
						type="date"
						variant="subtle"
					/>
				</Field.Root>
			</WrapItem>
			<WrapItem>
				<Field.Root>
					<Field.Label>Heure</Field.Label>
					<Input
						{...register(`${namespace}.time`)}
						type="time"
						variant="subtle"
					/>
				</Field.Root>
			</WrapItem>
			<WrapItem>
				<Field.Root>
					<Field.Label>Hauteur</Field.Label>
					<Input
						{...register(`${namespace}.height`)}
						type="number"
						step={0.01}
						min={0}
						max={20}
						htmlSize={4}
						variant="subtle"
					/>
				</Field.Root>
			</WrapItem>
		</Wrap>
	);
};

export default TideElementField;
