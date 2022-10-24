import NextImage from "next/future/image";
import { FormEvent, useState } from "react";

import { getBase64 } from "../utils/getBase64";

type ImagePreview = Pick<HTMLImageElement, "src" | "width" | "height">;

type Props = {
	onChange: (value?: string) => void;
	isLoading: boolean;
	className?: string;
};

export const ImagePicker = ({ onChange, isLoading, className }: Props) => {
	const [imagePreview, setImagePreview] = useState<ImagePreview>();

	const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];

		if (!!file) {
			const image = new Image();
			image.src = URL.createObjectURL(file);
			image.onload = () => {
				setImagePreview(image);
			};

			const base64Image = await getBase64(file);

			if (typeof base64Image === "string") {
				onChange(base64Image);
			}
		}
	};

	const handleRemove = () => {
		onChange(undefined);
		setImagePreview(undefined);
	};

	return (
		<div className={className}>
			{!imagePreview && (
				<div className="flex h-full w-full items-center justify-center border border-dashed border-stone-400 p-4">
					<label>
						{!isLoading && (
							<div className="btn-square btn w-full rounded-none p-4">
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
							hidden
							type="file"
							accept="image/*"
							onChange={onFileChange}
						/>
					</label>
				</div>
			)}
			{!!imagePreview?.src && (
				<div className="relative h-full w-full overflow-hidden bg-black">
					<NextImage
						src={imagePreview.src}
						height={imagePreview.height}
						width={imagePreview.width}
						className="h-full w-full object-contain"
					/>
					<button
						className="btn-primary btn-square btn absolute top-2 right-2 rounded-none"
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
