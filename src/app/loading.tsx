import { Fragment } from "react";
import { Header } from "~/app/_components/header";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";

export default function Loading() {
	return (
		<Fragment>
			<Header>
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-primary-foreground text-xl">
						Address Book
					</h1>
				</div>
				<Input
					type="search"
					placeholder="Search"
					autoComplete="off"
					autoCorrect="off"
					disabled
				/>
			</Header>
			<Progress indeterminate className="absolute top-0 rounded-none" />
		</Fragment>
	);
}
