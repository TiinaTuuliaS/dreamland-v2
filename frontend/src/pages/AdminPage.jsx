import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnalyticsTab from "../components/AnalyticsTab";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Luo tuote", icon: PlusCircle },
	{ id: "products", label: "Tuotteet", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytiikka", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className="relative min-h-screen bg-background overflow-hidden text-primary">

			{/* Background blur */}

			<div className="absolute top-24 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-10 right-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			<div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 pt-32 pb-24">

				{/* Heading */}

				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
						Dreamland Studio
					</p>

					<h1 className="font-heading text-5xl lg:text-6xl text-primary">
						Admin-hallintapaneeli
					</h1>

					<p className="mt-4 text-secondary">
						Hallitse tuotteita, sisältöä ja verkkokaupan analytiikkaa.
					</p>
				</motion.div>

				{/* Tabs */}

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.15 }}
					className="
						flex
						flex-wrap
						justify-center
						gap-3
						mb-10
					"
				>
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;

						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`
									inline-flex
									items-center
									gap-2
									rounded-full
									border
									px-5
									py-3
									text-sm
									font-medium
									transition-all
									duration-300
									${
										isActive
											? "bg-primary text-white border-primary shadow-soft"
											: "bg-surface text-secondary border-border hover:bg-accent hover:text-white hover:border-accent"
									}
								`}
							>
								<Icon size={18} />
								{tab.label}
							</button>
						);
					})}
				</motion.div>

				{/* Active content */}

				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35 }}
				>
					{activeTab === "create" && <CreateProductForm />}

					{activeTab === "products" && <ProductsList />}

					{activeTab === "analytics" && <AnalyticsTab />}
				</motion.div>

			</div>
		</div>
	);
};

export default AdminPage;
