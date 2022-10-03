import { Contact } from "@prisma/client";

export const hrefPrefixForField = (field: keyof Contact) => {
	switch (field) {
		case "phoneNumber":
			return "tel:";
		case "email":
			return "mailto:";
		default:
			return "";
	}
};
