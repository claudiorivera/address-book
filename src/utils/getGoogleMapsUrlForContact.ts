import type { ContactGetByIdOutput } from "~/server/api/routers/contact";

export function getGoogleMapsUrlForContact(
	contact: NonNullable<ContactGetByIdOutput>,
) {
	const url = new URL("https://www.google.com/maps/search/");

	const addressFields = [];

	for (const addressField of [
		contact.address1,
		contact.address2,
		contact.city,
		contact.state,
		contact.zip,
	]) {
		if (addressField) addressFields.push(addressField);
	}

	url.pathname += addressFields.join("%20");

	return url.toString();
}
