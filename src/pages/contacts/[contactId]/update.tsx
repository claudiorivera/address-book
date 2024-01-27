import classNames from "classnames";
import type { GetServerSidePropsContext } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "~/components/Input";
import { TextArea } from "~/components/TextArea";
import { useZodForm } from "~/hooks/useZodForm";
import { updateContactValidationSchema } from "~/schemas/updateContactValidationSchema";
import { api } from "~/utils/api";

export function getServerSideProps({ query }: GetServerSidePropsContext) {
	if (typeof query.contactId !== "string") {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			contactId: query.contactId,
		},
	};
}

export default function UpdateContactPage({
	contactId,
}: {
	contactId: string;
}) {
	const router = useRouter();
	const utils = api.useUtils();

	const { data: contact } = api.contact.getById.useQuery({
		id: contactId,
	});

	const { mutate: updateContact, isLoading } = api.contact.update.useMutation({
		onSettled: () =>
			utils.contact.getById.invalidate({
				id: contactId,
			}),
	});

	const {
		register,
		formState: { isDirty, errors },
		handleSubmit,
	} = useZodForm({
		schema: updateContactValidationSchema,
		values: {
			id: contactId,
			firstName: contact?.firstName,
			lastName: contact?.lastName,
			address1: contact?.address1,
			address2: contact?.address2,
			city: contact?.city,
			state: contact?.state,
			zip: contact?.zip,
			email: contact?.email,
			phoneNumber: contact?.phoneNumber,
			notes: contact?.notes,
		},
	});

	const hasPhoto = !!(
		contact?.photo?.url &&
		contact.photo.height &&
		contact.photo.width
	);

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-secondary">
				<Link href={`/contacts/${contactId}`} className="flex items-center">
					<span className="text-sm">Cancel</span>
				</Link>
				<button
					type="submit"
					className={classNames("text-sm", {
						"text-gray-500": !isDirty,
					})}
					form="update-contact"
					disabled={!isDirty || isLoading}
				>
					Done
				</button>
			</div>

			<form
				id="update-contact"
				onSubmit={handleSubmit((values) => {
					updateContact(values, {
						onSuccess: () => void router.push(`/contacts/${contactId}`),
					});
				})}
				className="flex flex-col gap-2"
			>
				<div className="mx-auto">
					<div className="avatar placeholder">
						<div className="relative w-24 rounded-full bg-base-300 text-base-content ring ring-secondary">
							{hasPhoto ? (
								<NextImage
									src={contact.photo.url}
									alt="avatar"
									height={contact.photo.height}
									width={contact.photo.width}
								/>
							) : (
								<span className="text-3xl">
									{contact?.firstName?.charAt(0).toUpperCase()}
									{contact?.lastName?.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="md:flex">
					<Input
						label="First Name"
						{...register("firstName")}
						autoComplete="given-name"
						error={errors.firstName?.message}
					/>
					<Input
						label="Last Name"
						{...register("lastName")}
						autoComplete="family-name"
						error={errors.lastName?.message}
					/>
				</div>
				<div className="md:flex">
					<Input
						label="Email"
						{...register("email")}
						autoComplete="email"
						error={errors.email?.message}
					/>
					<Input
						label="Phone Number"
						{...register("phoneNumber")}
						autoComplete="tel"
						error={errors.phoneNumber?.message}
					/>
				</div>
				<Input
					label="Address 1"
					{...register("address1")}
					autoComplete="address-line1"
					error={errors.address1?.message}
				/>
				<Input
					label="Address 2"
					{...register("address2")}
					autoComplete="address-line2"
					error={errors.address2?.message}
				/>
				<div className="md:flex">
					<Input
						label="City"
						{...register("city")}
						autoComplete="address-level2"
						error={errors.city?.message}
					/>
				</div>
				<div className="md:flex">
					<Input
						label="State"
						{...register("state")}
						autoComplete="address-level1"
						error={errors.state?.message}
					/>
					<Input
						label="Zip"
						{...register("zip")}
						autoComplete="postal-code"
						error={errors.zip?.message}
					/>
				</div>
				<TextArea
					label="Notes"
					{...register("notes")}
					error={errors.notes?.message}
				/>
			</form>
		</div>
	);
}
