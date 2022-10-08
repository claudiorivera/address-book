import classNames from "classnames";
import React, { forwardRef } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

import { FormError } from "./FormError";

type Props = {
	label: string;
	fieldError?: FieldError;
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
};

type Ref = HTMLTextAreaElement;

export const TextArea = forwardRef<Ref, Props>(
	({ label, fieldError, ...rest }, ref) => {
		return (
			<div className="flex w-full flex-col">
				<label className="label flex flex-col items-stretch gap-1">
					<span className="label-text">{label}</span>
					<textarea
						ref={ref}
						{...rest}
						className={classNames("textarea textarea-bordered", {
							"textarea-error": fieldError,
						})}
					/>
				</label>
				<FormError fieldError={fieldError} />
			</div>
		);
	},
);

TextArea.displayName = "TextArea";
