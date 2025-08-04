import {
	ChakraProvider,
	Container,
	defaultSystem,
	Heading,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Tide } from "../models/tide";
import { TideDisplay } from "./TideDisplay";
import { TideForm } from "./TideForm";

const TideCalculator = () => {
	const [tide, setTide] = useState<Tide | null>(null);
	return (
		<ChakraProvider value={defaultSystem}>
			<Container maxWidth="lg" mt={10}>
				<Heading as="h1" mb={1} size="4xl" color="blue.500">
					Calculateur de marée
				</Heading>
				<Text mb={6} fontSize="lg">
					Selon la règle des douzièmes
				</Text>
				<TideForm onSubmit={(data) => setTide(data)}></TideForm>
				{tide !== null && <TideDisplay tide={tide} />}
			</Container>
		</ChakraProvider>
	);
};

export { TideCalculator };
