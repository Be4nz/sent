import { round } from './Round';

export function countToDisplay(count: number) {
	if (count < 1000) {
		return count;
	} else if (count >= 1000000000) {
		return (count / 1000000000).toFixed(1) + 'B';
	} else if (count >= 1000000) {
		return (count / 1000000).toFixed(1) + 'M';
	} else {
		return (count / 1000).toFixed(1) + 'K';
	}
}
