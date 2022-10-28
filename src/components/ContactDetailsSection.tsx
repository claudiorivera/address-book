import Link from "next/link";

import { ConditionalWrapper } from "@/components";
import { ContactGetByIdOutput } from "@/server/trpc/router/contact";
import { hrefPrefixForField } from "@/utils";

type Props = {
	contact: ContactGetByIdOutput;
	label: string;
	field: string;
};

export const ContactDetailsSection = ({ contact, label, field }: Props) => {
	if (!contact?.[field as keyof ContactGetByIdOutput]) return null;

	const value = contact[field as keyof ContactGetByIdOutput];

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">{label}</label>
				<ConditionalWrapper
					condition={["email", "phoneNumber"].includes(field)}
					wrapper={(children) => (
						<Link href={`${hrefPrefixForField(field)}${value}`}>
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
