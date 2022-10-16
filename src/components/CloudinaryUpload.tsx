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

	const { mutateAsync: remove } = trpc.cloudinary.remove.useMutation();

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

	const handleRemove = async () => {
		if (image) {
			await remove({
				cloudinaryId: image.cloudinaryId,
			});

			setImage(undefined);
		} else {
			console.log("Unable to remove", { image });
		}
	};

	return (
		<div className="h-96 w-96 bg-base-100">
			<label className="cursor-pointer">
				<input
					id="upload"
					className="hidden"
					type="file"
					accept="image/*"
					onChange={onFileChange}
				/>
				{!image && (
					<div className="justify-content flex h-full items-center p-4">
						<div className="flex w-full justify-center">
							<span className="btn">Add</span>
						</div>
					</div>
				)}
			</label>
			<div className="justify-content flex h-full items-center p-4">
				{!!image && (
					<div className="flex h-full w-full flex-col items-center gap-4">
						<Image
							src={image.url}
							height={image.height}
							width={image.width}
							alt={image.cloudinaryId}
							className="h-full w-full object-contain"
						/>
						<button className="btn" onClick={handleRemove}>
							Remove
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
