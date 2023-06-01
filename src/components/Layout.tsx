import { ReactNode } from "react";

import { Meta } from "@/components";

type Props = {
	children: ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />

			<main className="container mx-auto max-w-3xl bg-base-200">
				{children}
			</main>
		</>
	);
};
