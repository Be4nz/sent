export function round(value: number, decimals: number) {
	return Math.round(Math.pow(10, decimals) * value) / Math.pow(10, decimals);
}
