import classNames from "classnames";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { TextArea } from "../../../components/TextArea";
import { TextField } from "../../../components/TextField";
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
		<>
			<div
				className={classNames("loading", {
					"animate-none": !isLoading,
				})}
			/>
			<main className="container mx-auto bg-base-200 p-4">
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
			</main>
		</>
	);
};

export default UpdateContactPage;
