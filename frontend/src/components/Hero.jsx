import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate();

	const handleExploreCollection = () => {
		// Jos ollaan jo etusivulla, vieritetään suoraan kategorioihin
		if (window.location.pathname === "/") {
			const categoriesSection =
				document.getElementById("categories");

			if (categoriesSection) {
				categoriesSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}

			return;
		}

		// Jos Heroa käytetään joskus muualla,
		// mennään ensin etusivulle
		navigate("/");

		setTimeout(() => {
			const categoriesSection =
				document.getElementById("categories");

			if (categoriesSection) {
				categoriesSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		}, 100);
	};

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="
				relative
				mx-auto
				w-[96%]
				max-w-[1600px]
				overflow-hidden
				rounded-[48px]
				shadow-soft
			"
		>
			{/* Taustakuva */}

			<motion.img
				src="/images/hero/dreamland-hero.png"
				alt="Dreamland Hero"
				className="
					absolute
					inset-0
					h-full
					w-full
					object-cover
					object-[83%]
					lg:object-[75%]
				"
				animate={{
					y: [0, -8, 0],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Overlay */}

			<div
				className="
					absolute
					inset-0
					bg-gradient-to-r
					from-background/90
					via-background/35
					to-transparent
				"
			/>

			{/* Sisältö */}

			<div
				className="
					relative
					z-10
					flex
					min-h-[70vh]
					items-end
					lg:min-h-[90vh]
					lg:items-center
				"
			>
				<div
					className="
						w-full
						max-w-xl
						px-8
						py-12
						lg:px-20
						lg:py-0
					"
				>
					<motion.p
						initial={{
							opacity: 0,
							y: 15,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							delay: 0.2,
						}}
						className="
							mb-4
							font-body
							text-xs
							uppercase
							tracking-[0.35em]
							text-secondary
							sm:text-sm
						"
					>
						Soft Future Jewelry
					</motion.p>

					<motion.h1
						initial={{
							opacity: 0,
							y: 15,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							delay: 0.35,
						}}
						className="
							font-heading
							text-4xl
							leading-none
							text-primary
							sm:text-5xl
							md:text-6xl
							lg:text-8xl
						"
					>
						✦ DREAMLAND
					</motion.h1>

					<motion.p
						initial={{
							opacity: 0,
							y: 15,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							delay: 0.5,
						}}
						className="
							mt-6
							max-w-md
							text-base
							leading-relaxed
							text-secondary
							sm:text-lg
							lg:text-xl
						"
					>
						Korosta omaa tyyliäsi.
						<br />
						Ajattomia koruja, joissa pehmeä futurismi
						kohtaa modernin eleganssin.
					</motion.p>

					{/* Tutustu mallistoon */}

					<motion.button
						type="button"
						onClick={handleExploreCollection}
						initial={{
							opacity: 0,
							y: 15,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							delay: 0.7,
						}}
						whileHover={{
							scale: 1.03,
						}}
						whileTap={{
							scale: 0.98,
						}}
						className="
							mt-8
							rounded-3xl
							bg-primary
							px-8
							py-4
							text-white
							shadow-soft
							transition-all
							duration-300
							hover:-translate-y-1
							hover:bg-accent
						"
					>
						Tutustu mallistoon
					</motion.button>
				</div>
			</div>
		</motion.section>
	);
};

export default Hero;