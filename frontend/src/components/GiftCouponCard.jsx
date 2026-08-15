import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag } from "lucide-react";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");

	const {
		coupon,
		isCouponApplied,
		applyCoupon,
		getMyCoupon,
		removeCoupon,
	} = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) {
			setUserInputCode(coupon.code);
		}
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
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

			<div className="flex items-center gap-3 mb-6">

				<div className="
					flex
					h-10
					w-10
					shrink-0
					items-center
					justify-center
					rounded-full
					bg-lavender/30
				">
					<Tag size={18} className="text-primary" />
				</div>

				<div>
					<p className="uppercase tracking-[0.25em] text-secondary text-[10px] mb-1">
						Dreamland extra
					</p>

					<h2 className="font-heading text-2xl text-primary">
						Kuponki tai lahjakortti
					</h2>
				</div>

			</div>

			{/* Coupon input */}

			<div className="space-y-4">

				<label
					htmlFor="voucher"
					className="block text-sm text-secondary"
				>
					Onko sinulla kuponkikoodi tai lahjakortti?
				</label>

				<div className="flex flex-col sm:flex-row gap-3">

					<input
						type="text"
						id="voucher"
						placeholder="Lisää koodi tähän"
						value={userInputCode}
						onChange={(e) =>
							setUserInputCode(e.target.value)
						}
						className="
							flex-1
							rounded-2xl
							border
							border-border
							bg-background
							px-4
							py-3
							text-sm
							text-primary
							outline-none
							transition-all
							duration-300
							placeholder:text-secondary/60
							focus:border-accent
							focus:ring-2
							focus:ring-accent/20
						"
					/>

					<motion.button
						type="button"
						onClick={handleApplyCoupon}
						whileHover={{ y: -1 }}
						whileTap={{ scale: 0.98 }}
						className="
							rounded-2xl
							bg-primary
							px-6
							py-3
							font-body
							text-sm
							font-medium
							text-white
							transition-all
							duration-300
							hover:bg-accent-hover
							hover:shadow-lg
						"
					>
						Lisää koodi
					</motion.button>

				</div>

			</div>

			{/* Applied coupon */}

			{isCouponApplied && coupon && (
				<div className="
					mt-6
					rounded-2xl
					border
					border-border
					bg-lavender/10
					p-5
				">

					<div className="flex items-start justify-between gap-4">

						<div>
							<p className="text-sm font-medium text-primary">
								Kuponki käytössä
							</p>

							<p className="mt-1 text-sm text-secondary">
								{coupon.code} · {coupon.discountPercentage}% alennusta
							</p>
						</div>

						<span className="
							rounded-full
							bg-lavender/30
							px-3
							py-1
							text-xs
							font-medium
							text-primary
						">
							-{coupon.discountPercentage}%
						</span>

					</div>

					<motion.button
						type="button"
						onClick={handleRemoveCoupon}
						whileHover={{ y: -1 }}
						whileTap={{ scale: 0.98 }}
						className="
							mt-4
							w-full
							rounded-2xl
							border
							border-border
							bg-surface
							py-3
							text-sm
							font-medium
							text-secondary
							transition-all
							duration-300
							hover:border-danger
							hover:text-danger
						"
					>
						Poista kuponki
					</motion.button>

				</div>
			)}

			{/* Available coupon */}

			{coupon && !isCouponApplied && (
				<div className="
					mt-6
					rounded-2xl
					bg-background
					border
					border-border
					p-5
				">

					<p className="text-sm font-medium text-primary">
						Saatavilla oleva kuponki
					</p>

					<p className="mt-2 text-sm text-secondary">
						{coupon.code} · {coupon.discountPercentage}% alennusta
					</p>

				</div>
			)}

		</motion.div>
	);
};

export default GiftCouponCard;