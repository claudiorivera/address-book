import { RouterOutput } from "./trpc";

type Contact = RouterOutput["contact"]["getById"];

export const hrefPrefixForField = (field: string) => {
	switch (field as keyof Contact) {
		case "phoneNumber":
			return "tel:";
		case "email":
			return "mailto:";
		default:
			return "";
	}
};
