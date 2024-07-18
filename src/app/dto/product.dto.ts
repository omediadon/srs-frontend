export interface Product{
	name: string;
	description: string;
	colors: string;
	visibility: boolean;
	price: number;
	main_picture: string;
}

export interface ProductSearchResult{
	products: Array<Product>;
}