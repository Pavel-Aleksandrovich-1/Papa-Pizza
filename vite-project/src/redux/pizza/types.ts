export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
}
 export type Pizza = {
	id: string;
	title: string;
	price: number;
	image: string;
	type: number;
	size: number;
	count: number;
}
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'succes',
	ERROR = 'error',
}

export interface pizzaState {
	items: Pizza[];
	status: Status;
}