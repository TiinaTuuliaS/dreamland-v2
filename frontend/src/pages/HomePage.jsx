import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import Hero from "../components/Hero";

const categories = [
	{
		href: "/korvakorut",
		name: "korvakorut",
		imageUrl: "/images/category/korvakorutv4.png",
	},
	{
		href: "/aurinkolasit",
		name: "aurinkolasit",
		imageUrl: "/images/category/aurinkolasitv2.png",
	},
	{
		href: "/sormukset",
		name: "sormukset",
		imageUrl: "/images/category/sormuksetv3.png",
	},
	{
		href: "/korusetit",
		name: "korusetit",
		imageUrl: "/images/category/korusetitv2.png",
	},
	{
		href: "/kaulakorut",
		name: "kaulakorut",
		imageUrl: "/images/category/kaulakorutv2.png",
	},
	{
		href: "/rannekorut",
		name: "rannekorut",
		imageUrl: "/images/category/rannekorutv3.png",
	},
];

const HomePage = () => {
	const {
		fetchFeaturedProducts,
		featuredProducts,
		loading,
	} = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className="relative min-h-screen overflow-hidden bg-background text-primary">

			{/* Blurit */}

			<div
				className="
					pointer-events-none
					absolute
					left-20
					top-20
					h-96
					w-96
					rounded-full
					bg-accent/20
					blur-[120px]
				"
			/>

			<div
				className="
					pointer-events-none
					absolute
					bottom-10
					right-20
					h-80
					w-80
					rounded-full
					bg-ice/40
					blur-[120px]
				"
			/>

			{/* Hero */}

			<Hero />

			{/* Featured Products */}

			{featuredProducts?.length > 0 && (
				<FeaturedProducts
					featuredProducts={featuredProducts}
				/>
			)}

			{loading && (
				<p className="text-center text-lg text-secondary">
					Ladataan tuotteita...
				</p>
			)}

			{!loading && featuredProducts?.length === 0 && (
				<p className="text-center text-lg text-secondary">
					Ei suosikkituotteita tällä hetkellä.
				</p>
			)}

			{/* Category heading */}

			<div
				id="categories"
				className="scroll-mt-24"
			>
				<div className="mb-12 mt-24 text-center">

					<p
						className="
							mb-3
							text-xs
							uppercase
							tracking-[0.35em]
							text-secondary
						"
					>
						Browse Collection
					</p>

					<h2
						className="
							font-heading
							text-4xl
							text-primary
							lg:text-5xl
						"
					>
						Shop by Category
					</h2>

				</div>

				{/* Categories */}

				<div
					className="
						relative
						z-10
						mx-auto
						w-[96%]
						max-w-[1600px]
						pb-24
						pt-8
					"
				>
					<div
						className="
							mb-12
							grid
							grid-cols-1
							gap-8
							sm:grid-cols-2
							lg:grid-cols-3
						"
					>
						{categories.map((category, index) => (
							<CategoryItem
								category={category}
								key={category.name}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>

		</div>
	);
};

export default HomePage;

