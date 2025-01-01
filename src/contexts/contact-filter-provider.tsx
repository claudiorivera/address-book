"use client";

import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ContactContext = {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
};

const ContactContext = createContext<ContactContext | null>(null);

export function useContactFilter() {
	const context = useContext(ContactContext);

	if (!context) {
		throw new Error(
			`${useContactFilter.name} must be used within ${ContactFilterProvider.name}`,
		);
	}

	return context;
}

export function ContactFilterProvider({
	children,
}: { children: React.ReactNode }) {
	const [query, setQuery] = useState("");

	return (
		<ContactContext.Provider value={{ query, setQuery }}>
			{children}
		</ContactContext.Provider>
	);
}
