import classNames from "classnames";
import cuid from "cuid";
import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "~/components/Input";
import { TextArea } from "~/components/TextArea";
import { useZodForm } from "~/hooks/useZodForm";
import {
	type Contact,
	type ContactGetAllOutput,
} from "~/server/api/routers/contact";
import { createContactSchema } from "~/server/db/schema";
import { api } from "~/utils/api";
import { collateContacts } from "~/utils/collateContacts";
import { filterByQuery } from "~/utils/filterByQuery";

export default function HomePage() {
	const [isCreateContactModalOpen, setIsCreateContactModalOpen] =
		useState(false);
	const [query, setQuery] = useState("");

	const { data: contacts = [] } = api.contact.getAll.useQuery();

	const filteredContacts = filterByQuery(contacts, query);

	const handleAddContactModalToggle = () => {
		setIsCreateContactModalOpen(!isCreateContactModalOpen);
	};

	return (
		<div className="relative">
			<h1 className="p-4 text-xl font-bold text-secondary">Address Book</h1>
			<button
				className="absolute right-4 top-4 text-secondary"
				onClick={handleAddContactModalToggle}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>

			<Search query={query} setQuery={setQuery} />
			<ContactList contacts={filteredContacts} />

			<CreateContactFormModal
				isOpen={isCreateContactModalOpen}
				onClose={handleAddContactModalToggle}
			/>
		</div>
	);
}

function ContactList({ contacts }: { contacts: ContactGetAllOutput }) {
	const collatedContacts = collateContacts(contacts);

	return (
		<>
			{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
				<ContactListSection key={label} label={label} contacts={contacts} />
			))}
		</>
	);
}

function ContactListSection({
	label,
	contacts,
}: {
	label: string;
	contacts: ContactGetAllOutput;
}) {
	return (
		<>
			<section className="sticky top-0 flex items-center bg-base-300 px-4 py-3 text-sm font-semibold text-secondary">
				{label}
			</section>

			{contacts.map((contact) => (
				<Link key={contact.id} href={`/contacts/${contact.id}`}>
					<ContactListRow contact={contact} />
				</Link>
			))}
		</>
	);
}

function ContactListRow({ contact }: { contact: Contact }) {
	return (
		<div className="flex items-center gap-4 px-4 py-2">
			<div className="h-10" />
			<strong className="text-sm font-medium text-base-content">
				<NameOrPhoneNumber contact={contact} />
			</strong>
		</div>
	);
}

function NameOrPhoneNumber({ contact }: { contact: Contact }) {
	if (contact.firstName ?? contact.lastName) {
		return (
			<span>
				{contact.firstName + " "}
				{contact.lastName}
			</span>
		);
	}

	return <span>{contact.phoneNumber}</span>;
}

function CreateContactFormModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
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
}

function CreateContactForm({ onClose }: { onClose: () => void }) {
	const utils = api.useUtils();

	const { mutateAsync: createContact, isLoading } =
		api.contact.create.useMutation({
			onSuccess: async () => {
				await utils.contact.getAll.invalidate();
				onClose();
			},
		});

	const form = useZodForm({
		schema: createContactSchema,
		defaultValues: {
			id: cuid(),
		},
	});

	const isSubmitDisabled = isLoading || !form.formState.isDirty;

	return (
		<>
			<div className="modal-action mt-0 flex justify-between pb-4">
				<button onClick={onClose}>Cancel</button>
				<h1 className="text-secondary">New Contact</h1>
				<button
					form="create-contact"
					disabled={isSubmitDisabled}
					className={classNames({
						"text-slate-500": isSubmitDisabled,
					})}
				>
					Done
				</button>
			</div>

			<form
				id="create-contact"
				onSubmit={form.handleSubmit(async (values) => {
					await createContact(values);
				})}
				className="flex flex-col gap-2"
			>
				<Input
					label="First Name"
					{...form.register("firstName")}
					error={form.formState.errors.firstName}
				/>
				<Input
					label="Last Name"
					{...form.register("lastName")}
					autoComplete="family-name"
					error={form.formState.errors.lastName}
				/>
				<Input
					label="Email"
					{...form.register("email")}
					autoComplete="email"
					type="email"
					error={form.formState.errors.email}
				/>
				<Input
					label="Phone Number"
					{...form.register("phoneNumber")}
					autoComplete="tel"
					type="tel"
					error={form.formState.errors.phoneNumber}
				/>
				<Input
					label="Address 1"
					{...form.register("address1")}
					autoComplete="address-line1"
					error={form.formState.errors.address1}
				/>
				<Input
					label="Address 2"
					{...form.register("address2")}
					autoComplete="address-line2"
					error={form.formState.errors.address2}
				/>
				<Input
					label="City"
					{...form.register("city")}
					autoComplete="address-level2"
					error={form.formState.errors.city}
				/>
				<Input
					label="State"
					{...form.register("state")}
					autoComplete="address-level1"
					error={form.formState.errors.state}
				/>
				<Input
					label="Zip"
					{...form.register("zip")}
					autoComplete="postal-code"
					error={form.formState.errors.zip}
				/>
				<TextArea
					label="Notes"
					{...form.register("notes")}
					error={form.formState.errors.notes}
				/>
			</form>
		</>
	);
}

function Search({
	query,
	setQuery,
}: {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}) {
	return (
		<div className="p-4 pt-0">
			<div className="relative">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<button
						type="submit"
						className="focus:shadow-outline p-1 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</span>
				<input
					type="search"
					className="input input-bordered w-full pl-8"
					placeholder="Search"
					autoComplete="off"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
		</div>
	);
}
