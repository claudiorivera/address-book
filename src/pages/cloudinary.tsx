import { CloudinaryUpload } from "../components/CloudinaryUpload";

const CloudinaryTestPage = () => {
	return (
		<div>
			<CloudinaryUpload imageName={new Date().toISOString()} />
		</div>
	);
};

export default CloudinaryTestPage;
