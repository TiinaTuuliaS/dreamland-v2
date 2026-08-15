import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

import Navbar from "./components/Navbar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen bg-background text-primary relative overflow-hidden">

			{/* Dreamland background */}

			<div className="pointer-events-none absolute inset-0 overflow-hidden">

				<div className="
					absolute
					-left-32
					-top-32
					h-96
					w-96
					rounded-full
					bg-accent/10
					blur-[120px]
				" />

				<div className="
					absolute
					-right-32
					top-1/3
					h-96
					w-96
					rounded-full
					bg-ice/30
					blur-[120px]
				" />

			</div>

			<div className="relative z-10">

				<Navbar />

				<Routes>

					<Route
						path="/"
						element={<HomePage />}
					/>

					<Route
						path="/signup"
						element={
							!user
								? <SignUpPage />
								: <Navigate to="/" />
						}
					/>

					<Route
						path="/login"
						element={
							!user
								? <LoginPage />
								: <Navigate to="/" />
						}
					/>

					<Route
						path="/secret-dashboard"
						element={
							user?.role === "admin"
								? <AdminPage />
								: <Navigate to="/login" />
						}
					/>

					<Route
						path="/category/:category"
						element={<CategoryPage />}
					/>

					<Route
						path="/product/:id"
						element={<ProductDetailsPage />}
					/>

					<Route
						path="/cart"
						element={
							user
								? <CartPage />
								: <Navigate to="/login" />
						}
					/>

					<Route
						path="/purchase-success"
						element={
							user
								? <PurchaseSuccessPage />
								: <Navigate to="/login" />
						}
					/>

					<Route
						path="/purchase-cancel"
						element={
							user
								? <PurchaseCancelPage />
								: <Navigate to="/login" />
						}
					/>

				</Routes>

			</div>

			<Toaster />

		</div>
	);
}

export default App;
