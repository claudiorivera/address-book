export function Header({ children }: { children: React.ReactNode }) {
	return (
		<header className="p-4">
			<div className="flex flex-col gap-4">{children}</div>
		</header>
	);
}
