import { LinearScale, Scale } from "chart.js";

const twelveTidePositions = [0, 1, 3, 6, 9, 11, 12];

class TwelveTideScale extends Scale {
	static id = "twelveTideScale";
	static defaults = LinearScale.defaults;

	buildTicks(): Array<{ value: number; label: string }> {
		return this.getLabels().map((label, i) => ({
			value: i,
			label,
		}));
	}

	getPixelForValue(value: number): number {
		const index =
			typeof value === "number" ? value : this.getLabels().indexOf(value);
		const normalizedPosition = twelveTidePositions[index] / 12;
		return this.left + normalizedPosition * (this.right - this.left);
	}
}

export { TwelveTideScale };
