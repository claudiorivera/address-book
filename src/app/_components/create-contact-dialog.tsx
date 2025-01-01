"use client";

import { PlusIcon } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
	type CreateContactFormState,
	createContact,
} from "~/app/_actions/contacts";
import { Header } from "~/app/_components/header";
import { FieldErrors } from "~/components/field-errors";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useContactFilter } from "~/contexts/contact-filter-provider";

export function CreateContactDialog() {
	const { query, setQuery } = useContactFilter();
	const [state, formAction] = useActionState<CreateContactFormState, FormData>(
		createContact,
		{
			errors: undefined,
		},
	);
	const { pending } = useFormStatus();

	return (
		<Dialog>
			<Header>
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-primary-foreground text-xl">
						Address Book
					</h1>
					<DialogTrigger>
						<PlusIcon className="size-6" />
					</DialogTrigger>
				</div>
				<Input
					type="search"
					placeholder="Search"
					autoComplete="off"
					autoCorrect="off"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</Header>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Contact</DialogTitle>
				</DialogHeader>

				<form
					id="create-contact"
					action={formAction}
					className="flex flex-col gap-2"
				>
					<div className="flex gap-4">
						<Input name="firstName" autoComplete="given-name" />
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.firstName} />

						<Input name="lastName" autoComplete="family-name" />
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.lastName} />
					</div>

					<Input name="email" autoComplete="email" type="email" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.email} />

					<Input name="phoneNumber" autoComplete="tel" type="tel" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.phoneNumber} />

					<Input name="address1" autoComplete="address-line1" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.address1} />

					<Input name="address2" autoComplete="address-line2" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.address2} />

					<Input name="city" autoComplete="address-level2" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.city} />

					<div className="flex gap-4">
						<Input name="state" autoComplete="address-level1" />
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.state} />
						<Input name="zip" autoComplete="postal-code" />
						<FieldErrors fieldErrors={state?.errors?.fieldErrors.zip} />
					</div>

					<Textarea name="notes" />
					<FieldErrors fieldErrors={state?.errors?.fieldErrors.notes} />
				</form>

				<DialogFooter>
					<Button
						type="submit"
						form="create-contact"
						aria-disabled={pending}
						disabled={pending}
					>
						save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
