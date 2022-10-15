import classNames from "classnames";
import React, {
	DetailedHTMLProps,
	forwardRef,
	InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
> & {
	label: string;
	error?: FieldError;
};

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
	(props, ref) => {
		const { label, error, ...inputProps } = props;

		return (
			<>
				<label className="label flex flex-col items-stretch gap-1">
					<span className="label-text">{label}</span>
					<textarea
						ref={ref}
						{...inputProps}
						className={classNames("textarea textarea-bordered", {
							"textarea-error": error,
						})}
					/>
				</label>
				<div className="text-xs text-red-500">{error?.message}</div>
			</>
		);
	},
);

TextArea.displayName = "TextArea";
