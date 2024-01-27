import classNames from "classnames";
import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	forwardRef,
} from "react";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
> & {
	label: string;
	error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
	function TextArea({ label, error, ...inputProps }, ref) {
		return (
			<div className="w-full">
				<label className="label flex flex-col items-stretch gap-1">
					<span className="label-text">{label}</span>
					<textarea
						ref={ref}
						{...inputProps}
						className={classNames("textarea textarea-bordered", {
							"textarea-error": !!error,
						})}
					/>
				</label>
				{!!error && <div className="text-xs text-red-500">{error}</div>}
			</div>
		);
	},
);
