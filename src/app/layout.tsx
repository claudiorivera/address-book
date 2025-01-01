import "~/styles/globals.css";

export const metadata = {
	title: "Address Book",
	description: "It's an address book!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main className="mx-auto min-h-screen max-w-3xl bg-primary">
					{children}
				</main>
			</body>
		</html>
	);
}
