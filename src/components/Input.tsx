import classNames from "classnames";
import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	forwardRef,
} from "react";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label: string;
	error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ label, error, type, ...inputProps },
	ref,
) {
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
							"input-error": !!error,
						},
					)}
				/>
			</label>
			{!!error && <div className="text-xs text-red-500">{error}</div>}
		</div>
	);
});
