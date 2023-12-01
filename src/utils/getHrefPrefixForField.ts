import { type Contact } from "~/server/api/routers/contact";

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
