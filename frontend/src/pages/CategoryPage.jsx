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
		<div className="relative min-h-screen overflow-hidden bg-background">

			{/* Background blur */}

			<div
				className="
					pointer-events-none
					absolute
					left-20
					top-24
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
					bottom-0
					right-10
					h-80
					w-80
					rounded-full
					bg-ice/40
					blur-[120px]
				"
			/>

			<div
				className="
					relative
					z-10
					mx-auto
					max-w-content
					px-6
					pb-24
					pt-28
					lg:px-8
					lg:pt-32
				"
			>

				{/* Back button */}

				<motion.button
					onClick={() => navigate(-1)}
					initial={{
						opacity: 0,
						x: -15,
					}}
					animate={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						duration: 0.5,
					}}
					className="
						mb-10
						inline-flex
						items-center
						gap-2
						rounded-full
						border
						border-border
						bg-surface
						px-5
						py-3
						text-sm
						font-medium
						text-primary
						shadow-soft
						transition-all
						duration-300
						hover:-translate-y-0.5
						hover:border-accent
						hover:bg-accent
						hover:text-white
					"
				>
					<ArrowLeft size={17} />
					Takaisin
				</motion.button>

				{/* Heading */}

				<motion.div
					initial={{
						opacity: 0,
						y: -20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.6,
					}}
					className="mb-10 text-center"
				>
					<p
						className="
							mb-4
							text-xs
							uppercase
							tracking-[0.35em]
							text-secondary
						"
					>
						Discover our collection
					</p>

					<h1
						className="
							mb-5
							font-heading
							text-5xl
							text-primary
							lg:text-6xl
						"
					>
						{title}
					</h1>

					<p
						className="
							mx-auto
							max-w-xl
							leading-relaxed
							text-secondary
						"
					>
						{categoryDescriptions[category]}
					</p>
				</motion.div>

				{/* Products */}

				<motion.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.6,
						delay: 0.2,
					}}
					className="
						grid
						grid-cols-1
						gap-8
						sm:grid-cols-2
						lg:grid-cols-3
						xl:grid-cols-4
					"
				>
					{products?.length === 0 ? (
						<div className="col-span-full py-24 text-center">

							<h2
								className="
									mb-4
									font-heading
									text-4xl
									text-primary
								"
							>
								Coming Soon
							</h2>

							<p className="text-secondary">
								We're adding beautiful new pieces
								to this collection.
							</p>

						</div>
					) : (
						products.map((product) => (
							<motion.div
								key={product._id}
								layout
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.35,
								}}
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


