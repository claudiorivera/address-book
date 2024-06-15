import { useIsFetching } from "@tanstack/react-query";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import type { ReactNode } from "react";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

function Layout({ children }: { children: ReactNode }) {
	const isLoading = useIsFetching();

	return (
		<>
			<Head>
				<title>Address Book</title>
				<meta
					name="description"
					content="Address Book - Made with Create T3 App"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto max-w-3xl bg-base-200 relative">
				{!!isLoading && (
					<progress className="progress progress-primary rounded-none h-1 absolute top-0" />
				)}
				{children}
			</main>
		</>
	);
}

export default api.withTRPC(MyApp);
