import classNames from "classnames";
import { forwardRef } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

import { FormError } from "./FormError";

type Props = {
	label: string;
	placeholder?: string;
	autoComplete?: string;
	fieldError?: FieldError;
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
};

type Ref = HTMLInputElement;

export const TextField = forwardRef<Ref, Props>(
	({ label, placeholder, autoComplete, fieldError, ...rest }, ref) => {
		return (
			<div className="flex w-full flex-col">
				<label className="label flex flex-col items-stretch gap-1">
					<span className="label-text">{label}</span>
					<input
						ref={ref}
						{...rest}
						className={classNames("input input-bordered", {
							"input-error": fieldError,
						})}
						{...(placeholder && { placeholder })}
						{...(autoComplete && { autoComplete })}
					/>
				</label>
				<FormError fieldError={fieldError} />
			</div>
		);
	},
);

TextField.displayName = "TextField";
