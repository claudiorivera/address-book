import NextImage from "next/future/image";
import { FormEvent, useState } from "react";

import { ContactType } from "../pages/contacts/[contactId]";
import { getBase64 } from "../utils/getBase64";
import { trpc } from "../utils/trpc";

type Photo = Partial<Pick<HTMLImageElement, "src" | "width" | "height">>;

type Props = {
	contact: ContactType;
};

export const ContactDetailsHeader = ({ contact }: Props) => {
	const utils = trpc.useContext();

	const [photo, setPhoto] = useState<Photo>({
		src: contact?.photo?.url,
		height: contact?.photo?.height,
		width: contact?.photo?.width,
	});
	const [base64, setBase64] = useState<string | null>(null);

	const { mutateAsync: upload } = trpc.contact.updatePhoto.useMutation({
		onSuccess: (contact) => {
			setPhoto({
				src: contact.photo?.url,
				height: contact.photo?.height,
				width: contact.photo?.width,
			});

			utils.contact.getById.invalidate({ id: contact.id });
		},
	});

	if (!contact) return null;

	const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
		if (!!event.currentTarget.files?.[0]) {
			const file = event.currentTarget.files[0];

			const image = new Image();
			image.src = URL.createObjectURL(file);
			image.onload = () => {
				setPhoto(image);
			};

			const base64string = await getBase64(file);

			if (typeof base64string === "string") {
				setBase64(base64string);
			}
		}
	};

	const handleSave = async () => {
		if (!!base64) {
			await upload({
				contactId: contact.id,
				base64,
			});
		}
	};

	console.log({ contact, photo });

	return (
		<>
			<div className="avatar placeholder">
				<div className="w-24 rounded-full bg-base-100 text-primary-content ring ring-secondary">
					{!photo.src && (
						<span className="text-3xl">
							{contact.firstName?.charAt(0).toUpperCase()}
							{contact.lastName?.charAt(0).toUpperCase()}
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
				</div>
			</div>
			<h1 className="mb-4 text-2xl font-bold text-base-content">
				{contact.firstName} {contact.lastName}
			</h1>
			<div>
				<input type="file" onChange={onFileChange} />
				<button onClick={handleSave}>Save</button>
			</div>
		</>
	);
};
