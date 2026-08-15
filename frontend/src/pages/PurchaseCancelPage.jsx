import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className="relative min-h-screen bg-background overflow-hidden">

			{/* Background blur */}

			<div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-10 left-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			<div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="
						w-full
						max-w-lg
						rounded-[28px]
						bg-surface
						border
						border-border
						shadow-soft
						p-8
						sm:p-10
						text-center
					"
				>

					{/* Icon */}

					<div className="
						mx-auto
						mb-6
						flex
						h-20
						w-20
						items-center
						justify-center
						rounded-full
						bg-background
					">
						<XCircle
							size={42}
							className="text-danger"
						/>
					</div>

					{/* Heading */}

					<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
						Checkout cancelled
					</p>

					<h1 className="font-heading text-4xl sm:text-5xl text-primary mb-5">
						Tilauksen peruutus
					</h1>

					<p className="text-secondary leading-relaxed mb-6">
						Tilauksesi on peruutettu eikä maksua veloitettu.
					</p>

					{/* Information */}

					<div className="
						rounded-2xl
						bg-background
						border
						border-border
						p-5
						mb-8
					">
						<p className="text-sm text-secondary leading-relaxed">
							Jos kohtasit ongelmia maksuprosessin aikana,
							voit yrittää uudelleen tai ottaa meihin yhteyttä.
						</p>
					</div>

					{/* Back to store */}

					<Link
						to="/"
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
							hover:shadow-lg
							hover:-translate-y-0.5
						"
					>
						<ArrowLeft size={18} />
						Takaisin kauppaan
					</Link>

				</motion.div>

			</div>
		</div>
	);
};

export default PurchaseCancelPage;
