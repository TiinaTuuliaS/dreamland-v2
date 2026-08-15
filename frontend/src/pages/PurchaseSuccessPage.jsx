import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState(null);

	const { clearCart } = useCartStore();

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});

				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(
			window.location.search
		).get("session_id");

		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("Session id:tä ei löydy");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<p className="text-secondary">
					Käsitellään tilausta...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center px-6">
				<div className="text-center">
					<p className="text-danger mb-4">
						Virhe: {error}
					</p>

					<Link
						to="/"
						className="text-primary hover:text-accent-hover transition-colors"
					>
						Takaisin kauppaan
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen bg-background overflow-hidden">

			{/* Background blur */}

			<div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-10 right-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			{/* Hillitty konfetti */}

			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.12}
				numberOfPieces={140}
				recycle={false}
				tweenDuration={5000}
				opacity={0.7}
				style={{ zIndex: 5 }}
			/>

			<div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">

				<div className="w-full max-w-lg">

					{/* Success card */}

					<div
						className="
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
							bg-lavender/30
						">
							<CheckCircle
								size={42}
								className="text-success"
							/>
						</div>

						{/* Heading */}

						<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
							Thank you for your order
						</p>

						<h1 className="font-heading text-4xl sm:text-5xl text-primary mb-5">
							Tilauksesi onnistui!
						</h1>

						<p className="text-secondary leading-relaxed">
							Kiitos ostoksestasi. Tilauksesi on vastaanotettu
							ja käsittelemme sen nyt.
						</p>

						<p className="mt-3 text-sm text-secondary">
							Tilausvahvistus ja tilauksen tiedot löytyvät
							sähköpostistasi.
						</p>

						{/* Order information */}

						<div className="
							mt-8
							rounded-2xl
							bg-background
							border
							border-border
							p-5
							text-left
						">

							<div className="flex items-center justify-between gap-4 mb-4">
								<span className="text-sm text-secondary">
									Tilausnumero
								</span>

								<span className="text-sm font-medium text-primary">
									#12345
								</span>
							</div>

							<div className="flex items-center justify-between gap-4">
								<span className="text-sm text-secondary">
									Arvioitu saapumisaika
								</span>

								<span className="text-sm font-medium text-primary">
									3–5 päivää
								</span>
							</div>

						</div>

						{/* Actions */}

						<div className="mt-8 space-y-3">

							<div className="
								flex
								items-center
								justify-center
								gap-2
								rounded-2xl
								bg-lavender/15
								border
								border-border
								px-5
								py-3.5
								text-sm
								text-primary
							">
								<HandHeart size={18} />
								<span>
									Kiitos kun teit ostoksia pienyrittäjältä
								</span>
							</div>

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
								Takaisin kauppaan
								<ArrowRight size={18} />
							</Link>

						</div>

					</div>

				</div>

			</div>
		</div>
	);
};

export default PurchaseSuccessPage;
