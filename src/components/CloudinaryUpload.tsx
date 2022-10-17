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

	const { mutateAsync: upload, isLoading: isUploadLoading } =
		trpc.cloudinary.upload.useMutation({
			onSuccess: (uploadedImage) => {
				setImage(uploadedImage);
			},
		});

	const { mutateAsync: remove, isLoading: isRemoveLoading } =
		trpc.cloudinary.remove.useMutation();

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
		}
	};

	const isLoading = isUploadLoading || isRemoveLoading;

	return (
		<div className="h-60 w-96 bg-stone-100">
			{!image && (
				<div className="flex h-full items-center justify-center border border-dashed border-stone-400">
					<label>
						{!isLoading && (
							<div className="btn btn-square w-full rounded-none p-4">
								Upload photo
							</div>
						)}
						{isLoading && (
							<svg
								className="h-10 w-10 animate-spin text-black"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						)}
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
						className="btn btn-square btn-primary absolute top-2 right-2 rounded-none"
						onClick={handleRemove}
					>
						{!isLoading && (
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
						)}
						{isLoading && (
							<svg
								className="h-4 w-4 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						)}
					</button>
				</div>
			)}
		</div>
	);
};
