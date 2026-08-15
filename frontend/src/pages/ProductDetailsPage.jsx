import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isAdded, setIsAdded] = useState(false);

	// Haetaan yksittäinen tuote
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await axios.get(`/products/${id}`);

				setProduct(response.data);
			} catch (error) {
				console.error("Virhe tuotteen haussa:", error);

				setError(
					error.response?.data?.message ||
						"Tuotetta ei voitu ladata."
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	// Tuotteen lisääminen ostoskoriin
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Kirjaudu sisään tehdäksesi ostoksia!", {
				id: "login",
			});

			return;
		}

		addToCart(product);
		setIsAdded(true);

		toast.success("Tuote lisätty ostoskoriin!");

		setTimeout(() => {
			setIsAdded(false);
		}, 2000);
	};

	// Lataus
	if (isLoading) {
		return <LoadingSpinner />;
	}

	// Virhe / tuotetta ei löydy
	if (error || !product) {
		return (
			<div className="min-h-[70vh] flex items-center justify-center px-6">
				<div
					className="
						w-full
						max-w-md
						rounded-[28px]
						border
						border-border
						bg-surface
						p-8
						text-center
						shadow-soft
					"
				>
					<p
						className="
							mb-4
							text-xs
							uppercase
							tracking-[0.25em]
							text-secondary
						"
					>
						Product not found
					</p>

					<h1
						className="
							mb-4
							font-heading
							text-4xl
							text-primary
						"
					>
						Tuotetta ei löytynyt
					</h1>

					<p
						className="
							mb-8
							text-sm
							leading-relaxed
							text-secondary
						"
					>
						Tuotetta ei voitu ladata. Se on ehkä poistettu
						tai linkki ei ole enää voimassa.
					</p>

					<Link
						to="/"
						className="
							inline-flex
							items-center
							justify-center
							gap-2
							rounded-2xl
							bg-primary
							px-6
							py-3
							text-sm
							font-medium
							text-white
							transition-all
							duration-300
							hover:bg-accent-hover
						"
					>
						<ArrowLeft size={17} />
						Takaisin kauppaan
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div
			className="
				relative
				min-h-screen
				overflow-hidden
				bg-background
			"
		>
			{/* Background decoration */}

			<div
				className="
					pointer-events-none
					absolute
					left-10
					top-20
					h-96
					w-96
					rounded-full
					bg-accent/10
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
					bg-ice/30
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

				{/* Product */}

				<div
					className="
						grid
						grid-cols-1
						items-center
						gap-10
						lg:grid-cols-2
						lg:gap-16
					"
				>
					{/* Product image */}

					<motion.div
						initial={{
							opacity: 0,
							x: -30,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.6,
						}}
						className="
							relative
							overflow-hidden
							rounded-[32px]
							border
							border-border
							bg-surface
							shadow-soft
						"
					>
						<div
							className="
								flex
								aspect-square
								items-center
								justify-center
								bg-lavender/20
								p-8
								sm:p-12
							"
						>
							<img
								src={product.image}
								alt={product.name}
								className="
									h-full
									w-full
									object-contain
									transition-transform
									duration-700
									hover:scale-105
								"
							/>
						</div>
					</motion.div>

					{/* Product details */}

					<motion.div
						initial={{
							opacity: 0,
							x: 30,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.6,
							delay: 0.1,
						}}
					>
						{/* Category */}

						<p
							className="
								mb-4
								text-xs
								uppercase
								tracking-[0.3em]
								text-secondary
							"
						>
							{product.category}
						</p>

						{/* Product name */}

						<h1
							className="
								font-heading
								text-5xl
								leading-tight
								text-primary
								sm:text-6xl
							"
						>
							{product.name}
						</h1>

						<div className="mt-6 h-px w-16 bg-accent" />

						{/* Description */}

						<p
							className="
								mt-6
								max-w-xl
								text-base
								leading-8
								text-secondary
							"
						>
							{product.description}
						</p>

						{/* Price */}

						<p
							className="
								mt-8
								font-heading
								text-4xl
								text-primary
							"
						>
							€ {Number(product.price).toFixed(2)}
						</p>

						{/* Add to cart */}

						<motion.button
							onClick={handleAddToCart}
							whileHover={{
								y: -2,
							}}
							whileTap={{
								scale: 0.98,
							}}
							className="
								mt-8
								flex
								w-full
								items-center
								justify-center
								gap-2
								rounded-2xl
								bg-primary
								px-6
								py-4
								text-sm
								font-medium
								text-white
								shadow-soft
								transition-all
								duration-300
								hover:bg-accent-hover
								hover:shadow-lg
								sm:w-auto
								sm:min-w-[260px]
							"
						>
							{isAdded ? (
								<>
									<Check size={19} />
									Lisätty ostoskoriin
								</>
							) : (
								<>
									<ShoppingCart size={19} />
									Lisää ostoskoriin
								</>
							)}
						</motion.button>

						{/* Product information */}

						<div
							className="
								mt-8
								grid
								grid-cols-1
								gap-3
								sm:grid-cols-2
							"
						>
							<div
								className="
									rounded-2xl
									border
									border-border
									bg-surface
									p-4
								"
							>
								<p
									className="
										text-xs
										uppercase
										tracking-[0.15em]
										text-secondary
									"
								>
									Collection
								</p>

								<p className="mt-1 text-sm text-primary">
									{product.category}
								</p>
							</div>

							<div
								className="
									rounded-2xl
									border
									border-border
									bg-surface
									p-4
								"
							>
								<p
									className="
										text-xs
										uppercase
										tracking-[0.15em]
										text-secondary
									"
								>
									Dreamland
								</p>

								<p className="mt-1 text-sm text-primary">
									Soft Future Jewelry
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;