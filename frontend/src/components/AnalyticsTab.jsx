import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
	Users,
	Package,
	ShoppingCart,
	Euro,
	TrendingUp,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});

	const [dailySalesData, setDailySalesData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/analytics");

				const formattedData =
					response.data.dailySalesData.map((item) => ({
						name: item.date || item.name,
						sales: Number(item.sales || item.totalSales || 0),
						revenue: Number(
							item.revenue || item.totalRevenue || 0
						),
					}));

				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(formattedData);
			} catch (error) {
				console.error(
					"Virhe analytiikkadatan lataamisessa:",
					error
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex min-h-[300px] items-center justify-center">
				<div className="text-center">
					<div
						className="
							mx-auto
							mb-4
							h-8
							w-8
							animate-spin
							rounded-full
							border-2
							border-border
							border-t-accent
						"
					/>

					<p className="text-sm text-secondary">
						Ladataan analytiikkaa...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">

			{/* Heading */}

			<div>
				<p
					className="
						mb-2
						text-xs
						uppercase
						tracking-[0.3em]
						text-secondary
					"
				>
					Dreamland overview
				</p>

				<h2 className="font-heading text-4xl text-primary">
					Analytiikka
				</h2>

				<p className="mt-2 text-sm text-secondary">
					Seuraa verkkokaupan tärkeimpiä lukuja ja myynnin kehitystä.
				</p>
			</div>

			{/* Statistics */}

			<div
				className="
					grid
					grid-cols-1
					sm:grid-cols-2
					xl:grid-cols-4
					gap-5
				"
			>
				<AnalyticsCard
					title="Käyttäjät"
					value={analyticsData.users}
					icon={Users}
				/>

				<AnalyticsCard
					title="Tuotteet"
					value={analyticsData.products}
					icon={Package}
				/>

				<AnalyticsCard
					title="Tilaukset"
					value={analyticsData.totalSales}
					icon={ShoppingCart}
				/>

				<AnalyticsCard
					title="Kokonaismyynti"
					value={`€${Number(
						analyticsData.totalRevenue
					).toFixed(2)}`}
					icon={Euro}
				/>
			</div>

			{/* Chart */}

			<motion.div
				className="
					rounded-[28px]
					border
					border-border
					bg-surface
					p-6
					sm:p-8
					shadow-soft
				"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					delay: 0.2,
				}}
			>
				<div
					className="
						mb-8
						flex
						flex-col
						gap-3
						sm:flex-row
						sm:items-center
						sm:justify-between
					"
				>
					<div>
						<h3 className="font-heading text-2xl text-primary">
							Myynnin kehitys
						</h3>

						<p className="mt-1 text-sm text-secondary">
							Tilaukset ja kokonaismyynti
						</p>
					</div>

					<div
						className="
							flex
							items-center
							gap-2
							rounded-full
							bg-lavender/30
							px-4
							py-2
							text-xs
							font-medium
							text-primary
						"
					>
						<TrendingUp size={15} />
						Sales overview
					</div>
				</div>

				<div className="h-[350px] w-full">
					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						<LineChart
							data={dailySalesData}
							margin={{
								top: 10,
								right: 20,
								left: 10,
								bottom: 10,
							}}
						>
							<CartesianGrid
								stroke="#ECEAF4"
								strokeDasharray="4 4"
								vertical={false}
							/>

							<XAxis
								dataKey="name"
								stroke="#6F7285"
								tick={{
									fill: "#6F7285",
									fontSize: 12,
								}}
								axisLine={false}
								tickLine={false}
							/>

							<YAxis
								stroke="#6F7285"
								tick={{
									fill: "#6F7285",
									fontSize: 12,
								}}
								axisLine={false}
								tickLine={false}
								allowDecimals={false}
								domain={[0, "auto"]}
							/>

							<Tooltip
								contentStyle={{
									backgroundColor: "#FFFFFF",
									border: "1px solid #ECEAF4",
									borderRadius: "16px",
									boxShadow:
										"0 10px 30px rgba(0,0,0,.08)",
								}}
								labelStyle={{
									color: "#1F1F23",
									fontWeight: "600",
									marginBottom: "6px",
								}}
							/>

							<Legend
								wrapperStyle={{
									paddingTop: "20px",
									fontSize: "13px",
								}}
							/>

							<Line
								type="monotone"
								dataKey="sales"
								stroke="#B8B3FF"
								strokeWidth={4}
								dot={{
									r: 5,
									fill: "#B8B3FF",
									strokeWidth: 0,
								}}
								activeDot={{
									r: 7,
								}}
								name="Tilaukset"
							/>

							<Line
								type="monotone"
								dataKey="revenue"
								stroke="#6F7285"
								strokeWidth={3}
								dot={{
									r: 5,
									fill: "#6F7285",
									strokeWidth: 0,
								}}
								activeDot={{
									r: 7,
								}}
								name="Kokonaismyynti"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</motion.div>
		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({
	title,
	value,
	icon: Icon,
}) => (
	<motion.div
		className="
			relative
			overflow-hidden
			rounded-[24px]
			border
			border-border
			bg-surface
			p-6
			shadow-soft
		"
		initial={{
			opacity: 0,
			y: 20,
		}}
		animate={{
			opacity: 1,
			y: 0,
		}}
		transition={{
			duration: 0.5,
		}}
		whileHover={{
			y: -3,
		}}
	>
		<div
			className="
				absolute
				-right-6
				-top-6
				h-24
				w-24
				rounded-full
				bg-accent/10
				blur-2xl
			"
		/>

		<div
			className="
				relative
				flex
				items-start
				justify-between
				gap-4
			"
		>
			<div>
				<p
					className="
						mb-2
						text-xs
						font-medium
						uppercase
						tracking-[0.18em]
						text-secondary
					"
				>
					{title}
				</p>

				<h3 className="font-heading text-4xl text-primary">
					{value}
				</h3>
			</div>

			<div
				className="
					flex
					h-11
					w-11
					shrink-0
					items-center
					justify-center
					rounded-2xl
					bg-lavender/40
					text-primary
				"
			>
				<Icon size={21} />
			</div>
		</div>
	</motion.div>
);