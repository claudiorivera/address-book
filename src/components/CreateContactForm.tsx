import classNames from "classnames";

import { useZodForm } from "../hooks/useZodForm";
import { createContactValidationSchema } from "../server/common/contact/createContactValidationSchema";
import { trpc } from "../utils/trpc";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";

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
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zip: "",
			notes: "",
		},
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
				<div className="md:flex">
					<TextField
						label="First Name"
						{...form.register("firstName")}
						autoComplete="given-name"
						fieldError={form.formState.errors.firstName}
					/>
					<TextField
						label="Last Name"
						{...form.register("lastName")}
						autoComplete="family-name"
						fieldError={form.formState.errors.lastName}
					/>
				</div>
				<div className="md:flex">
					<TextField
						label="Email"
						{...form.register("email")}
						autoComplete="email"
						fieldError={form.formState.errors.email}
					/>
					<TextField
						label="Phone Number"
						{...form.register("phoneNumber")}
						autoComplete="tel"
						fieldError={form.formState.errors.phoneNumber}
					/>
				</div>
				<TextField
					label="Address 1"
					{...form.register("address1")}
					autoComplete="address-line1"
					fieldError={form.formState.errors.address1}
				/>
				<TextField
					label="Address 2"
					{...form.register("address2")}
					autoComplete="address-line2"
					fieldError={form.formState.errors.address2}
				/>
				<div className="md:flex">
					<TextField
						label="City"
						{...form.register("city")}
						autoComplete="address-level2"
						fieldError={form.formState.errors.city}
					/>
				</div>
				<div className="md:flex">
					<TextField
						label="State"
						{...form.register("state")}
						autoComplete="address-level1"
						fieldError={form.formState.errors.state}
					/>
					<TextField
						label="Zip"
						{...form.register("zip")}
						autoComplete="postal-code"
						fieldError={form.formState.errors.zip}
					/>
				</div>
				<TextArea
					label="Notes"
					{...form.register("notes")}
					fieldError={form.formState.errors.notes}
				/>
			</form>
		</>
	);
};
