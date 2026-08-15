import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(
					error.response?.data?.message ||
						"Virhe suosituksia haettaessa"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="mt-12">

			{/* Heading */}

			<div className="mb-6">
				<p
					className="
						mb-2
						text-[10px]
						uppercase
						tracking-[0.3em]
						text-secondary
					"
				>
					You might also like
				</p>

				<h3 className="
					font-heading
					text-3xl
					text-primary
				">
					Muut ostivat myös
				</h3>
			</div>

			{/* Recommendations */}

			<div className="
				grid
				grid-cols-1
				sm:grid-cols-2
				lg:grid-cols-3
				gap-6
			">
				{recommendations.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
					/>
				))}
			</div>

		</div>
	);
};

export default PeopleAlsoBought;
