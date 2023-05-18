export type CartItem = {
	id: string;
	title: string;
	price: number;
	image: string;
	type: string;
	size: number;
	count: number;
}

export interface cartSliceState {
	totalPrice: number;
	items: CartItem[];
}