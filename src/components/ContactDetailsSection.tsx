import Link from "next/link";

import { ConditionalWrapper } from "@/components";
import { hrefPrefixForField, InferProcedures } from "@/utils";

type Contact = NonNullable<InferProcedures["contact"]["getById"]["output"]>;

type Props = {
	contact: Contact;
	label: string;
	field: string;
};

export const ContactDetailsSection = ({ contact, label, field }: Props) => {
	if (!contact?.[field as keyof Contact]) return null;

	const value = contact[field as keyof Contact];

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">{label}</label>
				<ConditionalWrapper
					condition={["email", "phoneNumber"].includes(field)}
					wrapper={(children) => (
						<Link
							href={`${hrefPrefixForField(field as keyof Contact)}${value}`}
						>
							<a>{children}</a>
						</Link>
					)}
				>
					<span>{typeof value === "string" ? value : ""}</span>
				</ConditionalWrapper>
			</div>
		</div>
	);
};
