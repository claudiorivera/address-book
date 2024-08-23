import { useIsFetching } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import type { ReactNode } from "react";
import { Progress } from "~/components/ui/progress";
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

			<main className="mx-auto max-w-3xl relative min-h-screen bg-primary">
				{!!isLoading && (
					<Progress indeterminate className="absolute top-0 rounded-none" />
				)}
				{children}
			</main>

			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default api.withTRPC(MyApp);
