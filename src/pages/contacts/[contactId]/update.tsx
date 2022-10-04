import classNames from "classnames";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

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
		<main className="container mx-auto h-screen bg-base-200 p-4">
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
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">First Name</span>
						<input
							{...form.register("firstName")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.firstName?.message,
							})}
							autoComplete="given-name"
						/>
						{!!form.formState.errors.firstName?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.firstName?.message}
							</div>
						)}
					</label>
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Last Name</span>
						<input
							{...form.register("lastName")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.lastName?.message,
							})}
							autoComplete="family-name"
						/>
						{!!form.formState.errors.lastName?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.lastName?.message}
							</div>
						)}
					</label>
				</div>
				<div className="md:flex">
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Email</span>
						<input
							{...form.register("email")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.email?.message,
							})}
							autoComplete="email"
						/>
						{!!form.formState.errors.email?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.email?.message}
							</div>
						)}
					</label>
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Phone Number</span>
						<input
							{...form.register("phoneNumber")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.phoneNumber?.message,
							})}
							autoComplete="tel"
						/>
						{!!form.formState.errors.phoneNumber?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.phoneNumber?.message}
							</div>
						)}
					</label>
				</div>
				<div className="md:flex">
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Address 1</span>
						<input
							{...form.register("address1")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.address1?.message,
							})}
							autoComplete="address-line1"
						/>
						{!!form.formState.errors.address1?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.address1?.message}
							</div>
						)}
					</label>
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Address 2</span>
						<input
							{...form.register("address2")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.address2?.message,
							})}
							autoComplete="address-line2"
						/>
						{!!form.formState.errors.address2?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.address2?.message}
							</div>
						)}
					</label>
				</div>
				<div className="md:flex">
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">City</span>
						<input
							{...form.register("city")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.city?.message,
							})}
							autoComplete="address-level2"
						/>
						{!!form.formState.errors.city?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.city?.message}
							</div>
						)}
					</label>
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">State</span>
						<input
							{...form.register("state")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.state?.message,
							})}
							autoComplete="address-level1"
						/>
						{!!form.formState.errors.state?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.state?.message}
							</div>
						)}
					</label>
					<label className="label flex flex-col items-stretch gap-1 md:flex-1">
						<span className="label-text">Zip</span>
						<input
							{...form.register("zip")}
							className={classNames("input input-bordered", {
								"input-error": form.formState.errors.zip?.message,
							})}
							autoComplete="postal-code"
						/>
						{!!form.formState.errors.zip?.message && (
							<div className="text-xs text-error">
								{form.formState.errors.zip?.message}
							</div>
						)}
					</label>
				</div>
			</form>
		</main>
	);
};

export default UpdateContactPage;
