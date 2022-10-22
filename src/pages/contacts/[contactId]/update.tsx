import { createProxySSGHelpers } from "@trpc/react/ssg";
import classNames from "classnames";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextImage from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import superjson from "superjson";

import { Input } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { useZodForm } from "../../../hooks/useZodForm";
import { updateContactValidationSchema } from "../../../server/common/contact/updateContactValidationSchema";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router";
import { getBase64 } from "../../../utils/getBase64";
import { trpc } from "../../../utils/trpc";

type Photo = Partial<Pick<HTMLImageElement, "src" | "width" | "height">>;

export const getServerSideProps = async ({
	params,
}: GetServerSidePropsContext<{ contactId: string }>) => {
	const contactId = params?.contactId as string;

	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	if (typeof contactId === "string") {
		ssg.contact.getById.prefetch({ id: contactId });
	}

	return {
		props: {
			contactId,
			trpcState: ssg.dehydrate(),
		},
	};
};

const UpdateContactPage = ({
	contactId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const utils = trpc.useContext();

	const { data: contact } = trpc.contact.getById.useQuery({
		id: contactId,
	});

	const [photo, setPhoto] = useState<Photo>({
		src: contact?.photo?.url,
		width: contact?.photo?.width,
		height: contact?.photo?.height,
	});

	const { mutateAsync: updateContact, isLoading } =
		trpc.contact.update.useMutation({
			onSuccess: async () => {
				await utils.contact.getById.invalidate();
				await router.push(`/contacts/${contactId}`);
			},
		});

	const {
		register,
		formState: { isDirty, errors },
		setValue,
		handleSubmit,
	} = useZodForm({
		schema: updateContactValidationSchema,
		defaultValues: {
			...contact,
		},
	});

	const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!!event.currentTarget.files?.[0]) {
			const file = event.currentTarget.files[0];

			const image = new Image();
			image.src = URL.createObjectURL(file);
			image.onload = () => {
				setPhoto(image);
			};

			const base64string = await getBase64(file);

			if (typeof base64string === "string") {
				setValue("photoBase64", base64string, {
					shouldDirty: true,
				});
			}
		}
	};

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
				<input hidden {...register("photoBase64")} />
				<div className="mx-auto">
					<div className="placeholder avatar">
						<div className="relative w-24 rounded-full bg-base-100 text-primary-content ring ring-secondary">
							{!photo.src && (
								<span className="text-3xl">
									{contact?.firstName?.charAt(0).toUpperCase()}
									{contact?.lastName?.charAt(0).toUpperCase()}
								</span>
							)}
							{!!photo.src && (
								<NextImage
									src={photo.src}
									alt="avatar"
									height={photo.height}
									width={photo.width}
								/>
							)}
							<div className="absolute top-0 right-0 bottom-0 left-0">
								<div className="flex h-full flex-col justify-end">
									<label className="cursor-pointer text-center hover:bg-base-100">
										<div className="text-transparent hover:text-secondary">
											Edit
										</div>
										<input
											className="hidden"
											type="file"
											accept="image/*"
											onChange={onFileChange}
										/>
									</label>
								</div>
							</div>
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
};

export default UpdateContactPage;
