import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import { useZodForm } from "../hooks/useZodForm";
import { createContactValidationSchema } from "../server/common/contact/createContactValidationSchema";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const utils = trpc.useContext();

  const { data: contacts } = trpc.contact.getAll.useQuery();

  const mutation = trpc.contact.create.useMutation({
    onSuccess: async () => {
      await utils.contact.getAll.invalidate();
    },
  });

  const form = useZodForm({
    schema: createContactValidationSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      notes: "",
    },
  });

  return (
    <>
      <Head>
        <title>Address Book</title>
        <meta
          name="description"
          content="Address Book - Made with Create T3 App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1>Address Book</h1>

        <form
          onSubmit={form.handleSubmit(async (values) => {
            await mutation.mutateAsync(values);
            form.reset();
          })}
          className="flex flex-col gap-2 pb-4"
        >
          <label className="label flex flex-col items-stretch gap-1">
            <span className="label-text">First Name</span>
            <input
              {...form.register("firstName")}
              className={classNames("input input-bordered", {
                "input-error": form.formState.errors.firstName?.message,
              })}
            />
            {!!form.formState.errors.firstName?.message && (
              <div className="text-xs text-error">
                {form.formState.errors.firstName?.message}
              </div>
            )}
          </label>

          <button type="submit" disabled={mutation.isLoading} className="btn">
            {mutation.isLoading ? "Loading" : "Submit"}
          </button>
        </form>

        <pre className="overflow-hidden">
          {JSON.stringify(contacts, null, 2)}
        </pre>
      </main>
    </>
  );
};

export default Home;
