import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Kirjaudu sisään tehdäksesi ostoksia!", {
				id: "login",
			});
			return;
		}

		addToCart(product);
		toast.success("Tuote lisätty ostoskoriin!");
	};

	return (
		<motion.div
			layout
			whileHover={{ y: -8 }}
			transition={{ duration: 0.25 }}
			className="
				group
				flex
				h-full
				flex-col
				overflow-hidden
				rounded-[28px]
				border
				border-border
				bg-surface
				shadow-soft
				transition-shadow
				duration-300
				hover:shadow-xl
			"
		>

			{/* Product Image */}

			<Link
				to={`/product/${product._id}`}
				className="
					relative
					flex
					aspect-square
					cursor-pointer
					items-center
					justify-center
					overflow-hidden
					bg-lavender/20
				"
			>
				<img
					src={product.image}
					alt={product.name}
					className="
						h-full
						w-full
						object-contain
						p-6
						transition-all
						duration-500
						group-hover:scale-105
						group-hover:rotate-1
					"
				/>

				<div
					className="
						pointer-events-none
						absolute
						inset-0
						bg-gradient-to-t
						from-black/5
						to-transparent
						opacity-0
						transition-opacity
						duration-500
						group-hover:opacity-100
					"
				/>

				{/* View details hint */}

				<div
					className="
						pointer-events-none
						absolute
						bottom-4
						left-1/2
						-translate-x-1/2
						rounded-full
						bg-surface/90
						px-4
						py-2
						text-xs
						font-medium
						text-primary
						opacity-0
						shadow-soft
						backdrop-blur-sm
						transition-all
						duration-300
						group-hover:opacity-100
					"
				>
					Katso tuotetta
				</div>
			</Link>


			{/* Product Content */}

			<div className="flex flex-1 flex-col p-6">

				{/* Product name */}

				<Link
					to={`/product/${product._id}`}
					className="
						font-heading
						text-2xl
						text-primary
						transition-colors
						duration-300
						hover:text-accent-hover
					"
				>
					{product.name}
				</Link>


				{/* Description */}

				<p
					className="
						mt-3
						flex-1
						text-sm
						leading-relaxed
						text-secondary
					"
				>
					{product.description}
				</p>


				<div className="mt-6">

					{/* Price */}

					<p
						className="
							mb-6
							font-heading
							text-3xl
							text-primary
						"
					>
						€ {Number(product.price).toFixed(2)}
					</p>


					{/* Product details */}

					<Link
						to={`/product/${product._id}`}
						className="
							mb-4
							flex
							items-center
							justify-center
							text-sm
							font-medium
							text-secondary
							transition-colors
							duration-300
							hover:text-primary
						"
					>
						Katso tuotteen tiedot
						<span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</Link>


					{/* Add to cart */}

					<button
						onClick={handleAddToCart}
						className="
							flex
							w-full
							items-center
							justify-center
							gap-2
							rounded-2xl
							bg-primary
							py-3.5
							font-body
							font-medium
							text-white
							transition-all
							duration-300
							hover:-translate-y-0.5
							hover:bg-accent-hover
							hover:shadow-lg
							active:scale-[0.98]
						"
					>
						<ShoppingCart size={18} />
						Lisää ostoskoriin
					</button>

				</div>

			</div>

		</motion.div>
	);
};

export default ProductCard;



