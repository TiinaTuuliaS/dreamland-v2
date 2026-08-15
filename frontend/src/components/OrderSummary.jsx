import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

// Stripe public key – testitila
const stripePromise = loadStripe(
	"pk_test_51RNyRyBDQOWIa4uWLmhTsTPG7jUIU0Lj1A6F0zLMPOndrp8wNFVhQPkJwwKnEkyFobcxOO3LwLJitYgRFFY4aIDy000eHuouim"
);

const OrderSummary = () => {
	const {
		total,
		subtotal,
		coupon,
		isCouponApplied,
		cart,
	} = useCartStore();

	const savings = subtotal - total;

	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		try {
			const stripe = await stripePromise;

			const res = await axios.post(
				"/payments/create-checkout-session",
				{
					products: cart,
					couponCode: coupon ? coupon.code : null,
				}
			);

			const session = res.data;

			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});

			if (result.error) {
				console.error(
					"Virhe maksutapahtumassa:",
					result.error
				);
			}
		} catch (error) {
			console.error(
				"Checkout-istunnon luominen epäonnistui:",
				error
			);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="
				rounded-[28px]
				bg-surface
				border
				border-border
				shadow-soft
				p-6
				sm:p-8
			"
		>
			{/* Heading */}

			<div className="mb-8">
				<p className="uppercase tracking-[0.3em] text-secondary text-xs mb-3">
					Your order
				</p>

				<h2 className="font-heading text-3xl text-primary">
					Tilauksen yhteenveto
				</h2>
			</div>

			{/* Price details */}

			<div className="space-y-4">

				<div className="flex items-center justify-between gap-4">
					<span className="text-sm text-secondary">
						Alkuperäinen hinta
					</span>

					<span className="font-medium text-primary">
						€ {formattedSubtotal}
					</span>
				</div>

				{savings > 0 && (
					<div className="flex items-center justify-between gap-4">
						<span className="text-sm text-secondary">
							Säästö
						</span>

						<span className="font-medium text-success">
							-€ {formattedSavings}
						</span>
					</div>
				)}

				{coupon && isCouponApplied && (
					<div className="flex items-center justify-between gap-4">
						<span className="text-sm text-secondary">
							Coupon ({coupon.code})
						</span>

						<span className="font-medium text-success">
							-{coupon.discountPercentage}%
						</span>
					</div>
				)}

				{/* Total */}

				<div className="
					flex
					items-center
					justify-between
					gap-4
					border-t
					border-border
					pt-5
					mt-5
				">
					<span className="font-heading text-xl text-primary">
						Yhteensä
					</span>

					<span className="font-heading text-2xl text-primary">
						€ {formattedTotal}
					</span>
				</div>

			</div>

			{/* Checkout */}

			<motion.button
				onClick={handlePayment}
				whileHover={{ y: -2 }}
				whileTap={{ scale: 0.98 }}
				className="
					mt-8
					w-full
					rounded-2xl
					bg-primary
					text-white
					py-4
					font-body
					font-medium
					flex
					items-center
					justify-center
					transition-all
					duration-300
					hover:bg-accent-hover
					hover:shadow-lg
				"
			>
				Kassalle
			</motion.button>

			{/* Continue shopping */}

			<div className="flex items-center justify-center gap-2 mt-5">
				<span className="text-sm text-secondary">
					tai
				</span>

				<Link
					to="/"
					className="
						inline-flex
						items-center
						gap-1.5
						text-sm
						font-medium
						text-primary
						transition-colors
						duration-200
						hover:text-accent-hover
					"
				>
					Takaisin ostoksille
					<MoveRight size={16} />
				</Link>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
