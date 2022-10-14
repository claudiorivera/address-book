import classNames from "classnames";

import { useZodForm } from "../hooks/useZodForm";
import { createContactValidationSchema } from "../server/common/contact/createContactValidationSchema";
import { trpc } from "../utils/trpc";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

type Props = {
	onClose: () => void;
};

export const CreateContactForm = ({ onClose }: Props) => {
	const utils = trpc.useContext();

	const { mutateAsync: createContact, isLoading } =
		trpc.contact.create.useMutation({
			onSuccess: async () => {
				await utils.contact.getByQuery.invalidate();
				onClose();
			},
		});

	const form = useZodForm({
		schema: createContactValidationSchema,
	});

	const isSubmitDisabled = isLoading || !form.formState.isDirty;

	return (
		<>
			<div className="modal-action mt-0 flex justify-between pb-4">
				<button onClick={onClose}>Cancel</button>
				<h1 className="text-secondary">New Contact</h1>
				<button
					form="create-contact"
					disabled={isSubmitDisabled}
					className={classNames({
						"text-slate-500": isSubmitDisabled,
					})}
				>
					Done
				</button>
			</div>

			<form
				id="create-contact"
				onSubmit={form.handleSubmit(async (values) => {
					await createContact(values);
				})}
				className="flex flex-col gap-2"
			>
				<Input
					label="First Name"
					{...form.register("firstName")}
					error={form.formState.errors.firstName}
				/>
				<Input
					label="Last Name"
					{...form.register("lastName")}
					autoComplete="family-name"
					error={form.formState.errors.lastName}
				/>
				<Input
					label="Email"
					{...form.register("email")}
					autoComplete="email"
					type="email"
					error={form.formState.errors.email}
				/>
				<Input
					label="Phone Number"
					{...form.register("phoneNumber")}
					autoComplete="tel"
					type="tel"
					error={form.formState.errors.phoneNumber}
				/>
				<Input
					label="Address 1"
					{...form.register("address1")}
					autoComplete="address-line1"
					error={form.formState.errors.address1}
				/>
				<Input
					label="Address 2"
					{...form.register("address2")}
					autoComplete="address-line2"
					error={form.formState.errors.address2}
				/>
				<Input
					label="City"
					{...form.register("city")}
					autoComplete="address-level2"
					error={form.formState.errors.city}
				/>
				<Input
					label="State"
					{...form.register("state")}
					autoComplete="address-level1"
					error={form.formState.errors.state}
				/>
				<Input
					label="Zip"
					{...form.register("zip")}
					autoComplete="postal-code"
					error={form.formState.errors.zip}
				/>
				<TextArea
					label="Notes"
					{...form.register("notes")}
					error={form.formState.errors.notes}
				/>
			</form>
		</>
	);
};
