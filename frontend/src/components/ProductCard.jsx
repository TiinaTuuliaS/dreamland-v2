import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const [isOpen, setIsOpen] = useState(false);

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

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeyDown);
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<motion.div
				layout
				whileHover={{ y: -8 }}
				transition={{ duration: 0.25 }}
				className="
					group
					flex
					flex-col
					h-full
					overflow-hidden
					rounded-[28px]
					bg-surface
					border
					border-border
					shadow-soft
					transition-shadow
					duration-300
					hover:shadow-xl
				"
			>
				{/* Product Image */}

				<div
					onClick={() => setIsOpen(true)}
					className="
						relative
						aspect-square
						cursor-pointer
						overflow-hidden
						bg-lavender/20
						flex
						items-center
						justify-center
					"
				>
					<img
						src={product.image}
						alt={product.name}
						className="
							w-full
							h-full
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
							absolute
							inset-0
							bg-gradient-to-t
							from-black/5
							to-transparent
							opacity-0
							group-hover:opacity-100
							transition-opacity
							duration-500
						"
					/>
				</div>

				{/* Product Content */}

				<div className="flex flex-1 flex-col p-6">

					<h3 className="font-heading text-2xl text-primary">
						{product.name}
					</h3>

					<p className="mt-3 text-sm leading-relaxed text-secondary flex-1">
						{product.description}
					</p>

					<div className="mt-6">

						<p className="font-heading text-3xl text-primary mb-6">
							€ {product.price.toFixed(2)}
						</p>

						<button
							onClick={handleAddToCart}
							className="
								w-full
								rounded-2xl
								bg-primary
								text-white
								py-3.5
								font-body
								font-medium
								flex
								items-center
								justify-center
								gap-2
								transition-all
								duration-300
								hover:bg-accent-hover
								hover:-translate-y-0.5
								hover:shadow-lg
								active:scale-[0.98]
							"
						>
							<ShoppingCart size={18} />
							Add to Cart
						</button>

					</div>

				</div>

			</motion.div>

						<AnimatePresence>
				{isOpen && (
					<motion.div
						className="
							fixed
							inset-0
							z-50
							flex
							items-center
							justify-center
							bg-black/70
							backdrop-blur-md
							p-6
						"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setIsOpen(false)}
					>
						<motion.div
							className="relative"
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.92 }}
							transition={{
								duration: 0.25,
								ease: "easeOut",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={product.image}
								alt={product.name}
								className="
									max-w-[90vw]
									max-h-[90vh]
									object-contain
									drop-shadow-2xl
								"
							/>

							<button
								onClick={() => setIsOpen(false)}
								className="
									absolute
									-top-4
									-right-4
									w-11
									h-11
									rounded-full
									bg-surface
									border
									border-border
									shadow-soft
									flex
									items-center
									justify-center
									text-primary
									transition-all
									duration-300
									hover:bg-accent
									hover:text-white
									hover:rotate-90
								"
							>
								<X size={20} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProductCard;



