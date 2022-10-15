import { useIsFetching } from "@tanstack/react-query";
import classNames from "classnames";
import { ReactNode } from "react";

import { Meta } from "./Meta";

type Props = {
	children: ReactNode;
};

export const Layout = ({ children }: Props) => {
	const isFetching = useIsFetching();

	return (
		<>
			<Meta />

			<div
				className={classNames("loading", {
					"animate-none": !isFetching,
				})}
			/>
			<main className="container mx-auto max-w-3xl bg-base-200">
				{children}
			</main>
		</>
	);
};
