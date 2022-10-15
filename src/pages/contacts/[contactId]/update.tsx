import classNames from "classnames";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Input } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { useZodForm } from "../../../hooks/useZodForm";
import { createContactValidationSchema } from "../../../server/common/contact/createContactValidationSchema";
import { trpc } from "../../../utils/trpc";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { contactId } = query;
	return {
		props: {
			contactId,
		},
	};
};

type Props = {
	contactId: string;
};

const UpdateContactPage = ({ contactId }: Props) => {
	const router = useRouter();
	const { data: contact } = trpc.contact.getById.useQuery({ id: contactId });

	const utils = trpc.useContext();

	const { mutateAsync: updateContact, isLoading } =
		trpc.contact.update.useMutation({
			onSuccess: async () => {
				await utils.contact.getByQuery.invalidate();
				await router.push(`/contacts/${contactId}`);
			},
		});

	const form = useZodForm({
		schema: createContactValidationSchema,
		defaultValues: {
			firstName: contact?.firstName ?? "",
			lastName: contact?.lastName ?? "",
			email: contact?.email ?? "",
			phoneNumber: contact?.phoneNumber ?? "",
			address1: contact?.address1 ?? "",
			address2: contact?.address2 ?? "",
			city: contact?.city ?? "",
			state: contact?.state ?? "",
			zip: contact?.zip ?? "",
			notes: contact?.notes ?? "",
		},
	});

	const isSubmitDisabled = isLoading || !form.formState.isDirty;

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-secondary">
				<Link href={`/contacts/${contactId}`}>
					<a className="flex items-center">
						<span className="text-sm">Cancel</span>
					</a>
				</Link>
				<button
					className={classNames("text-sm", {
						"text-slate-500": isSubmitDisabled,
					})}
					form="update-contact"
					disabled={isSubmitDisabled}
				>
					Done
				</button>
			</div>
			<form
				id="update-contact"
				onSubmit={form.handleSubmit(async (values) => {
					await updateContact({
						id: contactId,
						data: values,
					});
				})}
				className="flex flex-col gap-2"
			>
				<div className="md:flex">
					<Input
						label="First Name"
						{...form.register("firstName")}
						autoComplete="given-name"
						error={form.formState.errors.firstName}
					/>
					<Input
						label="Last Name"
						{...form.register("lastName")}
						autoComplete="family-name"
						error={form.formState.errors.lastName}
					/>
				</div>
				<div className="md:flex">
					<Input
						label="Email"
						{...form.register("email")}
						autoComplete="email"
						error={form.formState.errors.email}
					/>
					<Input
						label="Phone Number"
						{...form.register("phoneNumber")}
						autoComplete="tel"
						error={form.formState.errors.phoneNumber}
					/>
				</div>
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
				<div className="md:flex">
					<Input
						label="City"
						{...form.register("city")}
						autoComplete="address-level2"
						error={form.formState.errors.city}
					/>
				</div>
				<div className="md:flex">
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
				</div>
				<TextArea
					label="Notes"
					{...form.register("notes")}
					error={form.formState.errors.notes}
				/>
			</form>
		</div>
	);
};

export default UpdateContactPage;
