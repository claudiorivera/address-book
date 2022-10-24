import classNames from "classnames";

import { CreateContactForm } from "@/components";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateContactFormModal = ({ isOpen, onClose }: Props) => {
	if (!isOpen) return null;

	return (
		<div>
			<div
				className={classNames("modal modal-bottom sm:modal-middle", {
					"modal-open": isOpen,
				})}
			>
				<div className="modal-box">
					<CreateContactForm onClose={onClose} />
				</div>
			</div>
		</div>
	);
};
