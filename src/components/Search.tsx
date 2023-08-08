import { Dispatch, SetStateAction } from "react";

type Props = {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
};

export const Search = ({ query, setQuery }: Props) => {
	return (
		<div className="p-4 pt-0">
			<div className="relative">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<button
						type="submit"
						className="focus:shadow-outline p-1 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</span>
				<input
					type="search"
					className="input input-bordered w-full pl-8"
					placeholder="Search"
					autoComplete="off"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
		</div>
	);
};
