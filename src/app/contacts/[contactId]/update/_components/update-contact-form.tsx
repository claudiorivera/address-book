"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
	type UpdateContactFormState,
	updateContact,
} from "~/app/_actions/contacts";
import { FieldErrors } from "~/components/field-errors";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Contact } from "~/server/db/schema";

export function UpdateContactForm({
	contact,
}: { contact: NonNullable<Contact> }) {
	const [state, formAction] = useActionState<UpdateContactFormState, FormData>(
		updateContact,
		{
			errors: undefined,
		},
	);

	const { pending } = useFormStatus();

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-primary-foreground">
				<Link href={`/contacts/${contact.id}`} className="flex items-center">
					<span className="text-sm">Cancel</span>
				</Link>
				<button
					type="submit"
					className="text-primary-foreground text-sm"
					form="update-contact"
					disabled={pending}
				>
					Done
				</button>
			</div>

			<div className="p-4">
				<form
					id="update-contact"
					action={formAction}
					className="flex flex-col gap-2"
				>
					<Input type="hidden" name="id" value={contact.id} />

					<div className="flex gap-4">
						<Input
							name="firstName"
							defaultValue={contact.firstName ?? undefined}
							autoComplete="given-name"
						/>
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.firstName} />

						<Input
							name="lastName"
							defaultValue={contact.lastName ?? undefined}
							autoComplete="family-name"
						/>
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.lastName} />
					</div>

					<Input
						name="email"
						defaultValue={contact.email ?? undefined}
						autoComplete="email"
						type="email"
					/>
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.email} />

					<Input
						name="phoneNumber"
						defaultValue={contact.phoneNumber}
						autoComplete="tel"
						type="tel"
					/>
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.phoneNumber} />

					<Input
						name="address1"
						defaultValue={contact.address1 ?? undefined}
						autoComplete="address-line1"
					/>
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.address1} />

					<Input
						name="address2"
						defaultValue={contact.address2 ?? undefined}
						autoComplete="address-line2"
					/>
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.address2} />

					<Input
						name="city"
						defaultValue={contact.city ?? undefined}
						autoComplete="address-level2"
					/>
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.city} />

					<div className="flex gap-4">
						<Input
							name="state"
							defaultValue={contact.state ?? undefined}
							autoComplete="address-level1"
						/>
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.state} />
						<Input
							name="zip"
							defaultValue={contact.zip ?? undefined}
							autoComplete="postal-code"
						/>
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.zip} />
					</div>

					<Textarea name="notes" defaultValue={contact.notes ?? undefined} />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.notes} />
				</form>
			</div>
		</div>
	);
}
