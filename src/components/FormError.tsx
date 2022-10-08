import { FieldError } from "react-hook-form";

type Props = {
	fieldError?: FieldError;
};
export const FormError = ({ fieldError }: Props) => {
	if (!fieldError) return null;

	return (
		<div className="text-xs text-error">{fieldError.message?.toString()}</div>
	);
};
