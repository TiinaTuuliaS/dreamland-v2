import { useState } from "react";
import { motion } from "framer-motion";
import {
	Trash,
	Star,
	Pencil,
	X,
	Loader,
	ImagePlus,
} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	"korvakorut",
	"sormukset",
	"aurinkolasit",
	"korusetit",
	"rannekorut",
	"kaulakorut",
];

const ProductsList = () => {
	const {
		deleteProduct,
		toggleFeaturedProduct,
		updateProduct,
		products,
		loading,
	} = useProductStore();

	const [editingProduct, setEditingProduct] = useState(null);

	const handleEdit = (product) => {
		setEditingProduct({
			...product,
			price: product.price.toString(),
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			setEditingProduct((prev) => ({
				...prev,
				image: reader.result,
			}));
		};

		reader.readAsDataURL(file);
	};

	const handleSave = async (e) => {
		e.preventDefault();

		await updateProduct(editingProduct._id, {
			name: editingProduct.name,
			description: editingProduct.description,
			price: Number(editingProduct.price),
			category: editingProduct.category,
			image: editingProduct.image,
		});

		setEditingProduct(null);
	};

	return (
		<>
			{/* Products list */}

			<motion.div
				className="
					w-full
					rounded-[28px]
					bg-surface
					border
					border-border
					shadow-soft
					overflow-hidden
				"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="overflow-x-auto">
					<table className="min-w-full">

						<thead className="border-b border-border bg-background">
							<tr>
								{[
									"Tuote",
									"Hinta",
									"Kategoria",
									"Esittelyssä",
									"Toiminnot",
								].map((heading) => (
									<th
										key={heading}
										className="
											px-6
											py-4
											text-left
											text-xs
											font-medium
											uppercase
											tracking-wider
											text-secondary
										"
									>
										{heading}
									</th>
								))}
							</tr>
						</thead>

						<tbody className="divide-y divide-border">

							{products?.map((product) => (
								<tr
									key={product._id}
									className="
										transition-colors
										duration-200
										hover:bg-background/60
									"
								>
									{/* Product */}

									<td className="px-6 py-5">
										<div className="flex items-center gap-4">

											<div className="
												h-12
												w-12
												shrink-0
												overflow-hidden
												rounded-xl
												border
												border-border
												bg-background
											">
												<img
													src={product.image}
													alt={product.name}
													className="
														h-full
														w-full
														object-contain
														p-1
													"
												/>
											</div>

											<div>
												<p className="font-medium text-primary">
													{product.name}
												</p>

												<p className="
													mt-1
													max-w-xs
													truncate
													text-xs
													text-secondary
												">
													{product.description}
												</p>
											</div>

										</div>
									</td>

									{/* Price */}

									<td className="px-6 py-5 whitespace-nowrap">
										<span className="text-sm font-medium text-primary">
											€{product.price.toFixed(2)}
										</span>
									</td>

									{/* Category */}

									<td className="px-6 py-5 whitespace-nowrap">
										<span className="
											inline-flex
											rounded-full
											bg-lavender/30
											px-3
											py-1
											text-xs
											font-medium
											text-primary
										">
											{product.category}
										</span>
									</td>

									{/* Featured */}

									<td className="px-6 py-5">
										<button
											type="button"
											onClick={() =>
												toggleFeaturedProduct(
													product._id
												)
											}
											className={`
												flex
												h-9
												w-9
												items-center
												justify-center
												rounded-full
												border
												transition-all
												duration-200
												${
													product.isFeatured
														? "border-accent bg-accent text-white"
														: "border-border bg-background text-secondary hover:border-accent hover:text-primary"
												}
											`}
											aria-label={
												product.isFeatured
													? "Poista esittelystä"
													: "Lisää esittelyyn"
											}
										>
											<Star
												size={17}
												fill={
													product.isFeatured
														? "currentColor"
														: "none"
												}
											/>
										</button>
									</td>

									{/* Actions */}

									<td className="px-6 py-5">
										<div className="flex items-center gap-2">

											<button
												type="button"
												onClick={() =>
													handleEdit(product)
												}
												className="
													flex
													items-center
													gap-2
													rounded-full
													border
													border-border
													bg-background
													px-4
													py-2
													text-xs
													font-medium
													text-primary
													transition-all
													duration-200
													hover:bg-accent
													hover:text-white
													hover:border-accent
												"
											>
												<Pencil size={14} />
												Muokkaa
											</button>

											<button
												type="button"
												onClick={() =>
													deleteProduct(
														product._id
													)
												}
												className="
													flex
													h-9
													w-9
													items-center
													justify-center
													rounded-full
													border
													border-border
													text-secondary
													transition-all
													duration-200
													hover:border-danger
													hover:bg-danger
													hover:text-white
												"
												aria-label={`Poista ${product.name}`}
											>
												<Trash size={16} />
											</button>

										</div>
									</td>
								</tr>
							))}

						</tbody>
					</table>
				</div>

				{/* Empty state */}

				{(!products || products.length === 0) && (
					<div className="py-16 text-center">
						<p className="font-heading text-3xl text-primary">
							Ei tuotteita
						</p>

						<p className="mt-2 text-sm text-secondary">
							Luo ensimmäinen tuote yllä olevasta välilehdestä.
						</p>
					</div>
				)}

			</motion.div>

			{/* Edit modal */}

			{editingProduct && (
				<div className="
					fixed
					inset-0
					z-50
					flex
					items-center
					justify-center
					bg-primary/30
					backdrop-blur-sm
					p-6
				">

					<motion.div
						initial={{
							opacity: 0,
							scale: 0.96,
							y: 10,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							y: 0,
						}}
						className="
							w-full
							max-w-xl
							max-h-[90vh]
							overflow-y-auto
							rounded-[28px]
							bg-surface
							border
							border-border
							shadow-xl
							p-6
							sm:p-8
						"
					>

						{/* Modal heading */}

						<div className="
							flex
							items-start
							justify-between
							gap-4
							mb-8
						">

							<div>
								<p className="
									text-xs
									uppercase
									tracking-[0.3em]
									text-secondary
									mb-2
								">
									Dreamland Studio
								</p>

								<h2 className="
									font-heading
									text-4xl
									text-primary
								">
									Muokkaa tuotetta
								</h2>
							</div>

							<button
								type="button"
								onClick={() =>
									setEditingProduct(null)
								}
								className="
									flex
									h-10
									w-10
									shrink-0
									items-center
									justify-center
									rounded-full
									bg-background
									border
									border-border
									text-secondary
									transition-all
									hover:bg-accent
									hover:text-white
								"
								aria-label="Sulje"
							>
								<X size={19} />
							</button>

						</div>

						<form
							onSubmit={handleSave}
							className="space-y-5"
						>

							{/* Image */}

							<div>
								<label className="
									mb-2
									block
									text-sm
									font-medium
									text-primary
								">
									Tuotekuva
								</label>

								<input
									type="file"
									id="edit-image"
									className="sr-only"
									accept="image/*"
									onChange={handleImageChange}
								/>

								<label
									htmlFor="edit-image"
									className="
										block
										cursor-pointer
										rounded-2xl
										border
										border-dashed
										border-border
										bg-background
										p-4
										transition-all
										duration-300
										hover:border-accent
										hover:bg-accent/5
									"
								>
									<div className="
										flex
										items-center
										gap-4
									">

										<div className="
											h-24
											w-24
											shrink-0
											overflow-hidden
											rounded-xl
											border
											border-border
											bg-surface
										">
											<img
												src={editingProduct.image}
												alt={editingProduct.name}
												className="
													h-full
													w-full
													object-contain
													p-2
												"
											/>
										</div>

										<div>
											<div className="
												flex
												items-center
												gap-2
												text-sm
												font-medium
												text-primary
											">
												<ImagePlus size={18} />
												Vaihda tuotekuva
											</div>

											<p className="
												mt-1
												text-xs
												text-secondary
											">
												Klikkaa kuvaa vaihtaaksesi
												tuotekuvan.
											</p>

										</div>

									</div>
								</label>
							</div>

							{/* Name */}

							<div>
								<label
									htmlFor="edit-name"
									className="
										mb-2
										block
										text-sm
										font-medium
										text-primary
									"
								>
									Tuotteen nimi
								</label>

								<input
									id="edit-name"
									type="text"
									value={editingProduct.name}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
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
										focus:border-accent
										focus:ring-2
										focus:ring-accent/20
									"
									required
								/>
							</div>

							{/* Description */}

							<div>
								<label
									htmlFor="edit-description"
									className="
										mb-2
										block
										text-sm
										font-medium
										text-primary
									"
								>
									Kuvaus
								</label>

								<textarea
									id="edit-description"
									rows="4"
									value={editingProduct.description}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											description:
												e.target.value,
										})
									}
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
										focus:border-accent
										focus:ring-2
										focus:ring-accent/20
									"
									required
								/>
							</div>

							{/* Price + category */}

							<div className="
								grid
								grid-cols-1
								sm:grid-cols-2
								gap-5
							">

								<div>
									<label
										htmlFor="edit-price"
										className="
											mb-2
											block
											text-sm
											font-medium
											text-primary
										"
									>
										Hinta (€)
									</label>

									<input
										id="edit-price"
										type="number"
										step="0.01"
										min="0"
										value={editingProduct.price}
										onChange={(e) =>
											setEditingProduct({
												...editingProduct,
												price: e.target.value,
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
											focus:border-accent
											focus:ring-2
											focus:ring-accent/20
										"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="edit-category"
										className="
											mb-2
											block
											text-sm
											font-medium
											text-primary
										"
									>
										Kategoria
									</label>

									<select
										id="edit-category"
										value={editingProduct.category}
										onChange={(e) =>
											setEditingProduct({
												...editingProduct,
												category:
													e.target.value,
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
											focus:border-accent
											focus:ring-2
											focus:ring-accent/20
										"
										required
									>
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

							{/* Buttons */}

							<div className="
								flex
								flex-col-reverse
								sm:flex-row
								gap-3
								pt-3
							">

								<button
									type="button"
									onClick={() =>
										setEditingProduct(null)
									}
									className="
										flex-1
										rounded-2xl
										border
										border-border
										bg-background
										py-3.5
										text-sm
										font-medium
										text-secondary
										transition-all
										hover:bg-accent/10
									"
								>
									Peruuta
								</button>

								<button
									type="submit"
									disabled={loading}
									className="
										flex-1
										rounded-2xl
										bg-primary
										py-3.5
										text-sm
										font-medium
										text-white
										flex
										items-center
										justify-center
										gap-2
										transition-all
										hover:bg-accent-hover
										hover:shadow-lg
										disabled:opacity-50
										disabled:cursor-not-allowed
									"
								>
									{loading ? (
										<>
											<Loader
												size={18}
												className="animate-spin"
											/>
											Tallennetaan...
										</>
									) : (
										" Tallenna muutokset"
									)}
								</button>

							</div>

						</form>

					</motion.div>
				</div>
			)}
		</>
	);
};

export default ProductsList;


