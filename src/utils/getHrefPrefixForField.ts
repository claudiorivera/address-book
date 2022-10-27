import { InferProcedures } from "./trpc";

type Contact = InferProcedures["contact"]["getById"]["output"];

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
