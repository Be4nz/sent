export function convertToLocalTime(UTCDate: Date) {
	/* If every date isn't in new Date(), it doesn't work */
	return new Date(new Date(UTCDate).getTime() - new Date(UTCDate).getTimezoneOffset() * 60000);
}
