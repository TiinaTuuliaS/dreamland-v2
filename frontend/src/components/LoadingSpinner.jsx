const LoadingSpinner = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="relative">
				<div
					className="
						h-12
						w-12
						rounded-full
						border-2
						border-border
					"
				/>

				<div
					className="
						absolute
						left-0
						top-0
						h-12
						w-12
						animate-spin
						rounded-full
						border-2
						border-transparent
						border-t-accent
					"
				/>

				<div className="sr-only">
					Ladataan
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;