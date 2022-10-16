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
		<div className="h-60 w-96 bg-stone-100">
			{!image && (
				<div className="flex h-full items-center justify-center border border-dashed border-stone-400">
					<label>
						<div className="btn">Add</div>
						<input
							className="hidden"
							type="file"
							accept="image/*"
							onChange={onFileChange}
						/>
					</label>
				</div>
			)}
			{!!image && (
				<div className="relative bg-black">
					<Image
						src={image.url}
						height={image.height}
						width={image.width}
						alt={image.cloudinaryId}
						className="h-60 w-96 object-contain"
					/>
					<button
						className="btn btn-ghost btn-square absolute top-2 right-2 rounded-none"
						onClick={handleRemove}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
};
