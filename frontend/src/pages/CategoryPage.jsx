import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ArrowLeft } from "lucide-react";

const categoryDescriptions = {
	korvakorut: "Delicate details that brighten every look.",
	kaulakorut: "Elegant necklaces designed for everyday beauty.",
	sormukset: "Timeless rings with a dreamy touch.",
	rannekorut: "Light, feminine bracelets made to layer.",
	aurinkolasit: "Soft Y2K vibes for sunny days.",
	korusetit: "Perfectly matched pieces, ready to wear.",
};

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();

	const { category } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	const title =
		category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<div className="relative min-h-screen bg-background overflow-hidden">

			{/* Background blur */}

			<div className="absolute top-24 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-0 right-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			<div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 pt-5 pb-24">

				{/* Back button */}

				<button
					onClick={() => navigate("/")}
					className="
						inline-flex
						items-center
						gap-2
						rounded-full
						bg-surface
						border
						border-border
						shadow-soft
						px-5
						py-3
						text-secondary
						transition-all
						duration-300
						hover:bg-accent
						hover:text-white
						mb-8
					"
				>
					<ArrowLeft size={18} />
					Back to Home
				</button>

				{/* Heading */}

				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-10"
				>

					<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
						Discover our collection
					</p>

					<h1 className="font-heading text-5xl lg:text-6xl text-primary mb-5">
						{title}
					</h1>

					<p className="max-w-xl mx-auto text-secondary leading-relaxed">
						{categoryDescriptions[category]}
					</p>

				</motion.div>

				{/* Products */}

<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.6, delay: 0.2 }}
	className="
		grid
		grid-cols-1
		sm:grid-cols-2
		lg:grid-cols-3
		xl:grid-cols-4
		gap-8
	"
>
	{products?.length === 0 ? (
		<div className="col-span-full py-24 text-center">

			<h2 className="font-heading text-4xl text-primary mb-4">
				Coming Soon
			</h2>

			<p className="text-secondary">
				We're adding beautiful new pieces to this collection.
			</p>

		</div>
	) : (
		products.map((product) => (
			<motion.div
				key={product._id}
				layout
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35 }}
			>
				<ProductCard product={product} />
			</motion.div>
		))
	)}
</motion.div>

			</div>

		</div>
	);
};

export default CategoryPage;


