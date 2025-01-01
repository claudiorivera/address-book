import type { Contact } from "~/server/db/schema";

export function hrefPrefixForField(field: keyof Contact) {
	switch (field) {
		case "phoneNumber":
			return "tel:";
		case "email":
			return "mailto:";
		default:
			return "";
	}
}
