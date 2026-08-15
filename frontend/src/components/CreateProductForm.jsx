import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, ImagePlus } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	"korvakorut",
	"sormukset",
	"aurinkolasit",
	"korusetit",
	"rannekorut",
	"kaulakorut",
];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createProduct(newProduct);

			setNewProduct({
				name: "",
				description: "",
				price: "",
				category: "",
				image: "",
			});
		} catch (error) {
			console.log(
				"Virhe tuotteen luomisessa",
				error.message
			);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({
					...newProduct,
					image: reader.result,
				});
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="
				w-full
				max-w-2xl
				mx-auto
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

				<div className="flex items-center gap-3 mb-3">

					<div className="
						flex
						h-10
						w-10
						items-center
						justify-center
						rounded-full
						bg-lavender/30
					">
						<PlusCircle
							size={20}
							className="text-primary"
						/>
					</div>

					<p className="uppercase tracking-[0.3em] text-secondary text-xs">
						Dreamland Studio
					</p>

				</div>

				<h2 className="font-heading text-4xl text-primary">
					Luo uusi tuote
				</h2>

				<p className="mt-3 text-secondary">
					Lisää uusi tuote Dreamlandin kokoelmaan.
				</p>

			</div>

			<form
				onSubmit={handleSubmit}
				className="space-y-6"
			>

				{/* Product name */}

				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-primary mb-2"
					>
						Tuotteen nimi
					</label>

					<input
						type="text"
						id="name"
						name="name"
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								name: e.target.value,
							})
						}
						className="
							w-full
							rounded-2xl
							border
							border-border
							bg-background
							px-4
							py-3.5
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
						placeholder="Esim. Butterfly Ring"
						required
					/>
				</div>

				{/* Description */}

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-primary mb-2"
					>
						Kuvaus
					</label>

					<textarea
						id="description"
						name="description"
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								description: e.target.value,
							})
						}
						rows="4"
						className="
							w-full
							resize-none
							rounded-2xl
							border
							border-border
							bg-background
							px-4
							py-3.5
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
						placeholder="Kerro hieman tuotteesta..."
						required
					/>
				</div>

				{/* Price + category */}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium text-primary mb-2"
						>
							Hinta (€)
						</label>

						<input
							type="number"
							id="price"
							name="price"
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									price: e.target.value,
								})
							}
							step="0.01"
							min="0"
							className="
								w-full
								rounded-2xl
								border
								border-border
								bg-background
								px-4
								py-3.5
								text-sm
								text-primary
								outline-none
								transition-all
								duration-300
								focus:border-accent
								focus:ring-2
								focus:ring-accent/20
							"
							placeholder="29.90"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="category"
							className="block text-sm font-medium text-primary mb-2"
						>
							Kategoria
						</label>

						<select
							id="category"
							name="category"
							value={newProduct.category}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									category: e.target.value,
								})
							}
							className="
								w-full
								rounded-2xl
								border
								border-border
								bg-background
								px-4
								py-3.5
								text-sm
								text-primary
								outline-none
								transition-all
								duration-300
								focus:border-accent
								focus:ring-2
								focus:ring-accent/20
							"
							required
						>
							<option value="">
								Valitse kategoria
							</option>

							{categories.map((category) => (
								<option
									key={category}
									value={category}
								>
									{category}
								</option>
							))}
						</select>
					</div>

				</div>

				{/* Image upload */}

				<div>
					<label className="block text-sm font-medium text-primary mb-2">
						Tuotekuva
					</label>

					<input
						type="file"
						id="image"
						className="sr-only"
						accept="image/*"
						onChange={handleImageChange}
					/>

					<label
						htmlFor="image"
						className="
							flex
							min-h-32
							cursor-pointer
							items-center
							justify-center
							rounded-2xl
							border
							border-dashed
							border-border
							bg-background
							p-6
							text-center
							transition-all
							duration-300
							hover:border-accent
							hover:bg-accent/5
						"
					>
						{newProduct.image ? (
							<div className="flex items-center gap-3">

								<div className="
									h-16
									w-16
									overflow-hidden
									rounded-xl
									bg-surface
									border
									border-border
								">
									<img
										src={newProduct.image}
										alt="Tuotekuvan esikatselu"
										className="h-full w-full object-contain p-1"
									/>
								</div>

								<div className="text-left">
									<p className="text-sm font-medium text-primary">
										Kuva ladattu!
									</p>

									<p className="text-xs text-secondary mt-1">
										Vaihda kuva klikkaamalla
									</p>
								</div>

							</div>
						) : (
							<div className="flex flex-col items-center">

								<div className="
									flex
									h-12
									w-12
									items-center
									justify-center
									rounded-full
									bg-lavender/30
									mb-3
								">
									<ImagePlus
										size={22}
										className="text-primary"
									/>
								</div>

								<p className="text-sm font-medium text-primary">
									Lataa tuotekuva
								</p>

								<p className="text-xs text-secondary mt-1">
									PNG, JPG tai muu kuvatiedosto
								</p>

							</div>
						)}
					</label>
				</div>

				{/* Submit */}

				<motion.button
					type="submit"
					disabled={loading}
					whileHover={!loading ? { y: -2 } : {}}
					whileTap={!loading ? { scale: 0.98 } : {}}
					className="
						w-full
						rounded-2xl
						bg-primary
						py-3.5
						font-body
						font-medium
						text-white
						flex
						items-center
						justify-center
						gap-2
						transition-all
						duration-300
						hover:bg-accent-hover
						hover:shadow-lg
						disabled:opacity-50
						disabled:cursor-not-allowed
					"
				>
					{loading ? (
						<>
							<Loader
								className="h-5 w-5 animate-spin"
								aria-hidden="true"
							/>
							Ladataan...
						</>
					) : (
						<>
							<PlusCircle size={19} />
							Luo tuote
						</>
					)}
				</motion.button>

			</form>
		</motion.div>
	);
};

export default CreateProductForm;
