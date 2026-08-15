import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div
			className="
				group
				rounded-[28px]
				bg-surface
				border
				border-border
				shadow-soft
				p-5
				md:p-6
				transition-all
				duration-300
				hover:shadow-lg
			"
		>
			<div className="flex flex-col sm:flex-row sm:items-center gap-5">

				{/* Product image */}

				<div className="
					shrink-0
					w-24
					h-24
					md:w-32
					md:h-32
					rounded-2xl
					overflow-hidden
					bg-lavender/20
				">
					<img
						src={item.image}
						alt={item.name}
						className="
							w-full
							h-full
							object-contain
							p-3
							transition-transform
							duration-500
							group-hover:scale-105
						"
					/>
				</div>

				{/* Product information */}

				<div className="flex flex-1 flex-col min-w-0">

					<h3 className="font-heading text-2xl text-primary">
						{item.name}
					</h3>

					<p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-2">
						{item.description}
					</p>

					<button
						onClick={() => removeFromCart(item._id)}
						aria-label={`Poista ${item.name} ostoskorista`}
						className="
							mt-4
							self-start
							inline-flex
							items-center
							gap-1.5
							text-sm
							font-medium
							text-secondary
							transition-colors
							duration-200
							hover:text-danger
						"
					>
						<Trash2 size={16} />
						Poista
					</button>

				</div>

				{/* Quantity and price */}

				<div className="
					flex
					items-center
					justify-between
					sm:flex-col
					sm:items-end
					sm:justify-center
					gap-4
					sm:min-w-[130px]
				">

					<div className="
						flex
						items-center
						gap-3
						rounded-full
						border
						border-border
						bg-background
						p-1
					">

						<button
							onClick={() =>
								updateQuantity(item._id, item.quantity - 1)
							}
							aria-label={`Vähennä ${item.name} määrää`}
							className="
								flex
								h-8
								w-8
								items-center
								justify-center
								rounded-full
								text-secondary
								transition-all
								duration-200
								hover:bg-accent
								hover:text-white
							"
						>
							<Minus size={15} />
						</button>

						<span className="min-w-[20px] text-center font-medium text-primary">
							{item.quantity}
						</span>

						<button
							onClick={() =>
								updateQuantity(item._id, item.quantity + 1)
							}
							aria-label={`Lisää ${item.name} määrää`}
							className="
								flex
								h-8
								w-8
								items-center
								justify-center
								rounded-full
								text-secondary
								transition-all
								duration-200
								hover:bg-accent
								hover:text-white
							"
						>
							<Plus size={15} />
						</button>

					</div>

					<p className="font-heading text-2xl text-primary">
						€ {Number(item.price).toFixed(2)}
					</p>

				</div>

			</div>
		</div>
	);
};

export default CartItem;

