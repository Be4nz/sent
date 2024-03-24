import { round } from './Round';

export function countToDisplay(count: number) {
	let interval = round(count / 1000000000, 1);

	if (interval >= 1) {
		return interval + 'B';
	}
	interval = round(count / 1000000, 1);
	if (interval >= 1) {
		return interval + 'M';
	}
	interval = round(count / 1000, 1);
	if (interval >= 1) {
		return interval + 'K';
	}
	return count;
}
