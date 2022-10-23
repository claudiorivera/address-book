import { CloudinaryUpload } from "../components/CloudinaryUpload";

const CloudinaryTestPage = () => {
	return (
		<div className="flex min-h-screen justify-center p-4">
			<div className="flex max-w-sm flex-col gap-4">
				<CloudinaryUpload imageName={new Date().toISOString()} />
				<CloudinaryUpload imageName={new Date().toISOString()} />
				<CloudinaryUpload imageName={new Date().toISOString()} />
			</div>
		</div>
	);
};

export default CloudinaryTestPage;
