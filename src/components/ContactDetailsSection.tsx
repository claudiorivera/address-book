import { Contact } from "@prisma/client";
import Link from "next/link";

import { hrefPrefixForField } from "../utils/getHrefPrefixForField";

type Props = {
	contact: Contact;
	label: string;
	field: keyof Contact;
};

export const ContactDetailsSection = ({ contact, label, field }: Props) => {
	if (!contact[field]) return null;

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">{label}</label>
				<Link href={`${hrefPrefixForField(field)}${contact[field]}`}>
					<a>
						<span>{contact[field]}</span>
					</a>
				</Link>
			</div>
		</div>
	);
};
