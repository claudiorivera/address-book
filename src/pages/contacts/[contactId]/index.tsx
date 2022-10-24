import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import superjson from "superjson";

import { ContactDetails } from "@/components";
import { createContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/router";
import { trpc } from "@/utils";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const contactId = params?.contactId as string;

	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	if (typeof contactId === "string") {
		ssg.contact.getById.prefetch({ id: contactId });
	}

	return {
		props: {
			contactId,
			trpcState: ssg.dehydrate(),
		},
	};
};

const ContactDetailsPage = ({
	contactId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { data: contact } = trpc.contact.getById.useQuery({
		id: contactId,
	});

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-secondary">
				<Link href="/">
					<a className="flex items-center">
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
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
						<span className="text-sm">Contacts</span>
					</a>
				</Link>
				<Link href={`/contacts/${contactId}/update`}>
					<a>
						<span className="text-sm">Update</span>
					</a>
				</Link>
			</div>
			{!!contact && <ContactDetails contact={contact} />}
		</div>
	);
};

export default ContactDetailsPage;
