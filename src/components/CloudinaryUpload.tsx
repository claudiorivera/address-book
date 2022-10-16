import { inferProcedureOutput } from "@trpc/server";
import classNames from "classnames";
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
			console.log("no image to remove");
		}
	};

	return (
		<label className="h-96 w-96 bg-base-100">
			<input
				id="upload"
				className="hidden"
				type="file"
				accept="image/*"
				onChange={onFileChange}
			/>
			<>
				<div
					className={classNames(
						"flex h-full items-center justify-center p-4 text-base-content",
						{
							"cursor-pointer": !image,
						},
					)}
				>
					{!image && <span className="btn">Add</span>}
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
			</>
		</label>
	);
};
