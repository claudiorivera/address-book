import { inferProcedureOutput } from "@trpc/server";
import Image from "next/future/image";
import { FormEvent, useState } from "react";

import { AppRouter } from "../server/trpc/router";
import { getBase64 } from "../utils/getBase64";
import { trpc } from "../utils/trpc";

type CloudinaryUploadedImage = inferProcedureOutput<
	AppRouter["cloudinary"]["upload"]
>;

type Props = {
	imageName: string;
};

export const CloudinaryUpload = ({ imageName }: Props) => {
	const [image, setImage] = useState<CloudinaryUploadedImage>();

	const { mutateAsync: upload } = trpc.cloudinary.upload.useMutation({
		onSuccess: (uploadedImage) => {
			setImage(uploadedImage);
		},
	});

	const { mutateAsync: destroy } = trpc.cloudinary.destroy.useMutation();

	const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
		if (!!event.currentTarget.files?.[0]) {
			const base64string = await getBase64(event.currentTarget.files[0]);

			if (typeof base64string === "string") {
				await upload({
					base64string,
					imageName,
				});
			}
		}
	};

	const handleDestroy = async () => {
		if (image) {
			await destroy({
				cloudinaryId: image.cloudinaryId,
			});

			setImage(undefined);
		} else {
			console.log("no image to destroy");
		}
	};

	return (
		<div className="w-full p-4">
			<input type="file" accept="image/*" onChange={onFileChange} />
			{image && (
				<div className="h-32 w-32 bg-base-content">
					<Image
						src={image.url}
						height={image.height}
						width={image.width}
						alt={image.cloudinaryId}
						className="h-full w-full object-contain"
					/>
					<button onClick={handleDestroy}>Destroy</button>
				</div>
			)}
		</div>
	);
};
