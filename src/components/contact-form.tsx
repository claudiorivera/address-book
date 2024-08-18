import type { FormEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { createContactSchema } from "~/server/db/schema";

type ContactFormValues = z.infer<typeof createContactSchema>;

export function ContactForm({
	id,
	onSubmit,
}: {
	id: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
}) {
	const form = useFormContext<ContactFormValues>();

	return (
		<form id={id} onSubmit={onSubmit} className="flex flex-col gap-2">
			<div className="flex gap-4">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="given-name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="family-name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input {...field} autoComplete="email" type="email" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Phone Number</FormLabel>
						<FormControl>
							<Input {...field} autoComplete="tel" type="tel" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="address1"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Address 1</FormLabel>
						<FormControl>
							<Input {...field} autoComplete="address-line1" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="address2"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Address 2</FormLabel>
						<FormControl>
							<Input {...field} autoComplete="address-line2" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="city"
				render={({ field }) => (
					<FormItem>
						<FormLabel>City</FormLabel>
						<FormControl>
							<Input {...field} autoComplete="address-level2" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex gap-4">
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="address-level1" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="zip"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Zip</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="postal-code" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="notes"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Notes</FormLabel>
						<FormControl>
							<Textarea {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</form>
	);
}
