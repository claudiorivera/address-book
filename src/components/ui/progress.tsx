import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "~/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<
	typeof ProgressPrimitive.Root
> & {
	indeterminate?: boolean;
};

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	ProgressProps
>(({ className, value, indeterminate = false, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-1 w-full overflow-hidden rounded-full bg-transparent",
			className,
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className={cn(
				"h-full w-full flex-1 bg-primary-foreground transition-all",
				indeterminate && "origin-left animate-progress",
			)}
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
