import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className="relative min-h-screen bg-background text-primary overflow-hidden">

			{/* Background blur */}

			<div className="absolute top-24 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-10 right-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			<div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 pt-32 pb-24">

				{/* Back to Home */}

				<Link
					to="/"
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
						mb-12
					"
				>
					<ArrowLeft size={18} />
					Back to Home
				</Link>

				{/* Heading */}

				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
						Your selections
					</p>

					<h1 className="font-heading text-5xl lg:text-6xl text-primary">
						Ostoskori
					</h1>

					{cart.length > 0 && (
						<p className="mt-4 text-secondary">
							{cart.length}{" "}
							{cart.length === 1 ? "tuote" : "tuotetta"} ostoskorissasi
						</p>
					)}
				</motion.div>

				{cart.length === 0 ? (
					<EmptyCartUI />
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">

						{/* Cart items */}

						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className="space-y-8"
						>
							<div className="space-y-6">
								{cart.map((item) => (
									<CartItem
										key={item._id}
										item={item}
									/>
								))}
							</div>

							<PeopleAlsoBought />
						</motion.div>

						{/* Order summary */}

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.25 }}
							className="space-y-6 lg:sticky lg:top-28"
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>

					</div>
				)}

			</div>
		</div>
	);
};

export default CartPage;


// Empty cart

const EmptyCartUI = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="flex justify-center py-10"
	>
		<div
			className="
				w-full
				max-w-lg
				rounded-[28px]
				bg-surface
				border
				border-border
				shadow-soft
				p-10
				md:p-14
				text-center
			"
		>
			<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-lavender/30">
				<ShoppingCart
					size={42}
					className="text-primary"
				/>
			</div>

			<p className="uppercase tracking-[0.3em] text-secondary text-xs mb-4">
				Your Dreamland bag
			</p>

			<h2 className="font-heading text-4xl text-primary mb-4">
				Ostoskorisi on tyhjä
			</h2>

			<p className="text-secondary leading-relaxed max-w-sm mx-auto mb-8">
				Näyttää siltä, että et ole vielä löytänyt täydellistä
				tuotetta. Tutustu kokoelmaamme ja löydä oma suosikkisi.
			</p>

			<Link
				to="/"
				className="
					inline-flex
					w-full
					items-center
					justify-center
					gap-2
					rounded-2xl
					bg-primary
					text-white
					py-3.5
					font-body
					font-medium
					transition-all
					duration-300
					hover:bg-accent-hover
					hover:-translate-y-0.5
					hover:shadow-lg
				"
			>
				<ArrowLeft size={18} />
				Jatka ostoksia
			</Link>
		</div>
	</motion.div>
);