import classNames from "classnames";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { ImagePicker } from "../components/ImagePicker";
import { useZodForm } from "../hooks/useZodForm";
import { imageUploadValidationSchema } from "../server/common/imageUploadValidationSchema";

const CloudinaryTestPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const {
		formState: { isDirty, isValid },
		control,
		handleSubmit,
	} = useZodForm({
		schema: imageUploadValidationSchema,
	});

	return (
		<div className="min-h-screen p-4">
			<form
				onSubmit={handleSubmit((values) => {
					console.log({ values });
					// fake submit
					setIsLoading(true);
					setTimeout(() => {
						setIsLoading(false);
					}, 3000);
				})}
				className="mx-auto flex max-w-sm flex-col gap-2"
			>
				<Controller
					control={control}
					name="base64Image"
					render={({ field: { onChange } }) => (
						<ImagePicker
							className="aspect-[3/2] w-full"
							onChange={onChange}
							isLoading={isLoading}
						/>
					)}
				/>
				<div className="flex flex-wrap gap-2">
					<Controller
						control={control}
						name="base64Image"
						render={({ field: { onChange } }) => (
							<ImagePicker
								className="aspect-[2/3] h-full flex-1"
								onChange={onChange}
								isLoading={isLoading}
							/>
						)}
					/>
					<Controller
						control={control}
						name="base64Image"
						render={({ field: { onChange } }) => (
							<ImagePicker
								className="aspect-[2/3] h-full flex-1"
								onChange={onChange}
								isLoading={isLoading}
							/>
						)}
					/>
				</div>

				<button
					className={classNames("btn", {
						"btn-disabled": !isDirty || !isValid,
					})}
					disabled={!isDirty || !isValid}
					type="submit"
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default CloudinaryTestPage;
