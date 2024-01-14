import classNames from "classnames";
import {
	type DetailedHTMLProps,
	forwardRef,
	type InputHTMLAttributes,
} from "react";
import { type FieldError } from "react-hook-form";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label: string;
	error?: FieldError;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, error, type, ...inputProps } = props;

	return (
		<div className="w-full">
			<label className="label flex flex-col items-stretch gap-1">
				<span className="label-text">{label}</span>
				<input
					ref={ref}
					{...inputProps}
					type={type ?? "text"}
					className={classNames(
						{
							"input input-bordered": type !== "checkbox" && type !== "file",
						},
						{
							toggle: type === "checkbox",
						},
						{
							"input-error": error,
						},
					)}
				/>
			</label>
			<div className="text-xs text-red-500">{error?.message}</div>
		</div>
	);
});

Input.displayName = "Input";
