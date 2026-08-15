import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

// Frontin ja apin "välittäjät"

export const useProductStore = create((set) => ({
	products: [],
	featuredProducts: [],
	loading: false,
	error: null,

	setProducts: (products) => set({ products }),

	// Luo uusi tuote
	createProduct: async (productData) => {
		set({ loading: true });

		try {
			const res = await axios.post("/products", productData);

			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Virhe tuotteen luomisessa"
			);
		}
	},

	// Hae kaikki tuotteet
	fetchAllProducts: async () => {
		set({ loading: true });

		try {
			const response = await axios.get("/products");

			set({
				products: response.data.products,
				loading: false,
			});
		} catch (error) {
			set({
				error: "Failed to fetch products",
				loading: false,
			});

			toast.error(
				error.response?.data?.error ||
					"Failed to fetch products"
			);
		}
	},

	// Hae kategorian tuotteet
	fetchProductsByCategory: async (category) => {
		set({ loading: true });

		try {
			const response = await axios.get(
				`/products/category/${category}`
			);

			set({
				products: response.data.products,
				loading: false,
			});
		} catch (error) {
			set({
				error: "Failed to fetch products",
				loading: false,
			});

			toast.error(
				error.response?.data?.error ||
					"Failed to fetch products"
			);
		}
	},

	// Muokkaa tuotetta
	updateProduct: async (productId, updatedData) => {
		set({ loading: true });

		try {
			const response = await axios.put(
				`/products/${productId}`,
				updatedData
			);

			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId
						? response.data
						: product
				),
				loading: false,
			}));

			toast.success("Tuote päivitetty!");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Virhe tuotteen päivittämisessä"
			);
		}
	},

	// Poista tuote
	deleteProduct: async (productId) => {
		set({ loading: true });

		try {
			await axios.delete(`/products/${productId}`);

			set((prevState) => ({
				products: prevState.products.filter(
					(product) => product._id !== productId
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.error ||
					"Virhe tuotteen poistamisessa"
			);
		}
	},

	// Featured päälle / pois
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });

		try {
			const response = await axios.patch(
				`/products/${productId}`
			);

			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId
						? {
								...product,
								isFeatured:
									response.data.isFeatured,
							}
						: product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.error ||
					"Virhe featured toiminnossa"
			);
		}
	},

	// Hae featured-tuotteet
	fetchFeaturedProducts: async () => {
		set({ loading: true });

		try {
			const response = await axios.get(
				"/products/featured"
			);

			set({
				featuredProducts: response.data,
				loading: false,
			});
		} catch (error) {
			set({
				error: "Tuotteita ei voitu hakea",
				loading: false,
			});

			console.log(
				"Error featured tuotteita ei voitu hakea:",
				error
			);
		}
	},
}));