import { useState } from "react";
import { Link } from "react-router-dom";
import {
	UserPlus,
	Mail,
	Lock,
	User,
	ArrowRight,
	Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(formData);
	};

	return (
		<div className="relative min-h-screen bg-background overflow-hidden text-primary">

			{/* Background blur */}

			<div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

			<div className="absolute bottom-10 left-10 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

			<div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-32">

				<div className="w-full max-w-md">

					{/* Heading */}

					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-10"
					>
						<p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
							Join Dreamland
						</p>

						<h1 className="font-heading text-5xl text-primary">
							Luo tilisi
						</h1>

						<p className="mt-4 text-secondary">
							Luo oma Dreamland-tilisi ja aloita shoppailu.
						</p>
					</motion.div>

					{/* Sign up card */}

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
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
						<form
							onSubmit={handleSubmit}
							className="space-y-5"
						>

							{/* Name */}

							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-primary mb-2"
								>
									Nimi
								</label>

								<div className="relative">

									<User
										className="
											absolute
											left-4
											top-1/2
											-translate-y-1/2
											h-5
											w-5
											text-secondary
										"
										aria-hidden="true"
									/>

									<input
										id="name"
										type="text"
										required
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										className="
											w-full
											rounded-2xl
											border
											border-border
											bg-background
											py-3.5
											pl-12
											pr-4
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
										placeholder="Nimesi"
									/>

								</div>
							</div>

							{/* Email */}

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-primary mb-2"
								>
									Sähköposti
								</label>

								<div className="relative">

									<Mail
										className="
											absolute
											left-4
											top-1/2
											-translate-y-1/2
											h-5
											w-5
											text-secondary
										"
										aria-hidden="true"
									/>

									<input
										id="email"
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData({
												...formData,
												email: e.target.value,
											})
										}
										className="
											w-full
											rounded-2xl
											border
											border-border
											bg-background
											py-3.5
											pl-12
											pr-4
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
										placeholder="you@example.com"
									/>

								</div>
							</div>

							{/* Password */}

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-primary mb-2"
								>
									Salasana
								</label>

								<div className="relative">

									<Lock
										className="
											absolute
											left-4
											top-1/2
											-translate-y-1/2
											h-5
											w-5
											text-secondary
										"
										aria-hidden="true"
									/>

									<input
										id="password"
										type="password"
										required
										autoComplete="new-password"
										value={formData.password}
										onChange={(e) =>
											setFormData({
												...formData,
												password: e.target.value,
											})
										}
										className="
											w-full
											rounded-2xl
											border
											border-border
											bg-background
											py-3.5
											pl-12
											pr-4
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
										placeholder="••••••••"
									/>

								</div>
							</div>

							{/* Confirm password */}

							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium text-primary mb-2"
								>
									Toista salasana
								</label>

								<div className="relative">

									<Lock
										className="
											absolute
											left-4
											top-1/2
											-translate-y-1/2
											h-5
											w-5
											text-secondary
										"
										aria-hidden="true"
									/>

									<input
										id="confirmPassword"
										type="password"
										required
										autoComplete="new-password"
										value={formData.confirmPassword}
										onChange={(e) =>
											setFormData({
												...formData,
												confirmPassword:
													e.target.value,
											})
										}
										className="
											w-full
											rounded-2xl
											border
											border-border
											bg-background
											py-3.5
											pl-12
											pr-4
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
										placeholder="••••••••"
									/>

								</div>
							</div>

							{/* Submit */}

							<motion.button
								type="submit"
								disabled={loading}
								whileHover={!loading ? { y: -2 } : {}}
								whileTap={!loading ? { scale: 0.98 } : {}}
								className="
									mt-2
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
										Lataa...
									</>
								) : (
									<>
										<UserPlus
											className="h-5 w-5"
											aria-hidden="true"
										/>
										Rekisteröidy
									</>
								)}
							</motion.button>

						</form>

						{/* Login link */}

						<div className="mt-8 pt-6 border-t border-border text-center">

							<p className="text-sm text-secondary">
								Onko sinulla jo tili?
							</p>

							<Link
								to="/login"
								className="
									mt-2
									inline-flex
									items-center
									gap-1.5
									text-sm
									font-medium
									text-primary
									transition-colors
									duration-200
									hover:text-accent-hover
								"
							>
								Kirjaudu sisään
								<ArrowRight size={16} />
							</Link>

						</div>

					</motion.div>

				</div>

			</div>
		</div>
	);
};

export default SignUpPage;
