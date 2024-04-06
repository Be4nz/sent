export interface PaginatedModel<T> {
	data: T[];
	pagination: {
		total: number;
		lastPage: number;
		prevPage?: number;
		nextPage?: number;
		perPage: number;
		currentPage: number;
		from: number;
		to: number;
	};
}
