import classNames from "classnames";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "~/components/Input";
import { TextArea } from "~/components/TextArea";
import { useZodForm } from "~/hooks/useZodForm";
import { updateContactValidationSchema } from "~/schemas/updateContactValidationSchema";
import { api } from "~/utils/api";

export default function UpdateContactPage() {
	const router = useRouter();
	const utils = api.useUtils();
	const contactId = router.query.contactId as string;

	const { data: contact } = api.contact.getById.useQuery({
		id: contactId,
	});

	const photo: Partial<Pick<HTMLImageElement, "src" | "width" | "height">> = {
		src: contact?.photo?.url,
		width: contact?.photo?.width,
		height: contact?.photo?.height,
	};

	const { mutate: updateContact, isLoading } = api.contact.update.useMutation({
		onSuccess: async () => {
			await utils.contact.getById.invalidate();
			await router.push(`/contacts/${contactId}`);
		},
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

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-secondary">
				<Link href={`/contacts/${contactId}`} className="flex items-center">
					<span className="text-sm">Cancel</span>
				</Link>
				<button
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
					updateContact(values);
				})}
				className="flex flex-col gap-2"
			>
				<div className="mx-auto">
					<div className="avatar placeholder">
						<div className="relative w-24 rounded-full bg-base-300 text-base-content ring ring-secondary">
							{!!photo.src ? (
								<NextImage
									src={photo.src}
									alt="avatar"
									height={photo.height}
									width={photo.width}
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
						error={errors.firstName}
					/>
					<Input
						label="Last Name"
						{...register("lastName")}
						autoComplete="family-name"
						error={errors.lastName}
					/>
				</div>
				<div className="md:flex">
					<Input
						label="Email"
						{...register("email")}
						autoComplete="email"
						error={errors.email}
					/>
					<Input
						label="Phone Number"
						{...register("phoneNumber")}
						autoComplete="tel"
						error={errors.phoneNumber}
					/>
				</div>
				<Input
					label="Address 1"
					{...register("address1")}
					autoComplete="address-line1"
					error={errors.address1}
				/>
				<Input
					label="Address 2"
					{...register("address2")}
					autoComplete="address-line2"
					error={errors.address2}
				/>
				<div className="md:flex">
					<Input
						label="City"
						{...register("city")}
						autoComplete="address-level2"
						error={errors.city}
					/>
				</div>
				<div className="md:flex">
					<Input
						label="State"
						{...register("state")}
						autoComplete="address-level1"
						error={errors.state}
					/>
					<Input
						label="Zip"
						{...register("zip")}
						autoComplete="postal-code"
						error={errors.zip}
					/>
				</div>
				<TextArea label="Notes" {...register("notes")} error={errors.notes} />
			</form>
		</div>
	);
}
