import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { order,
			sortBy,
			category,
			search,
			currentPage } = params;
		const { data } = await axios.get(`https://6427dbb846fd35eb7c46d36b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`);
		return data;
	}
)
