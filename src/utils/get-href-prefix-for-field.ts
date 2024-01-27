import type { ContactGetByIdOutput } from "~/server/api/routers/contact";

type Contact = NonNullable<ContactGetByIdOutput>;

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
