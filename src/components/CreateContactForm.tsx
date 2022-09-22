import classNames from "classnames";

import { useZodForm } from "../hooks/useZodForm";
import { createContactValidationSchema } from "../server/common/contact/createContactValidationSchema";
import { trpc } from "../utils/trpc";

export const CreateContactForm = () => {
  const utils = trpc.useContext();

  const { mutateAsync: createContact, isLoading } =
    trpc.contact.create.useMutation({
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
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await createContact(values);
        form.reset();
      })}
      className="flex flex-col gap-2 pb-4"
    >
      <div className="md:flex">
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">First Name</span>
          <input
            {...form.register("firstName")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.firstName?.message,
            })}
            autoComplete="given-name"
          />
          {!!form.formState.errors.firstName?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.firstName?.message}
            </div>
          )}
        </label>
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Last Name</span>
          <input
            {...form.register("lastName")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.lastName?.message,
            })}
            autoComplete="family-name"
          />
          {!!form.formState.errors.lastName?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.lastName?.message}
            </div>
          )}
        </label>
      </div>
      <div className="md:flex">
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Email</span>
          <input
            {...form.register("email")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.email?.message,
            })}
            autoComplete="email"
          />
          {!!form.formState.errors.email?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.email?.message}
            </div>
          )}
        </label>
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Phone Number</span>
          <input
            {...form.register("phoneNumber")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.phoneNumber?.message,
            })}
            autoComplete="tel"
          />
          {!!form.formState.errors.phoneNumber?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.phoneNumber?.message}
            </div>
          )}
        </label>
      </div>
      <div className="md:flex">
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Address 1</span>
          <input
            {...form.register("address1")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.address1?.message,
            })}
            autoComplete="address-line1"
          />
          {!!form.formState.errors.address1?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.address1?.message}
            </div>
          )}
        </label>
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Address 2</span>
          <input
            {...form.register("address2")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.address2?.message,
            })}
            autoComplete="address-line2"
          />
          {!!form.formState.errors.address2?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.address2?.message}
            </div>
          )}
        </label>
      </div>
      <div className="md:flex">
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">City</span>
          <input
            {...form.register("city")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.city?.message,
            })}
            autoComplete="address-level2"
          />
          {!!form.formState.errors.city?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.city?.message}
            </div>
          )}
        </label>
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">State</span>
          <input
            {...form.register("state")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.state?.message,
            })}
            autoComplete="address-level1"
          />
          {!!form.formState.errors.state?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.state?.message}
            </div>
          )}
        </label>
        <label className="md:flex-1 label flex flex-col items-stretch gap-1">
          <span className="label-text">Zip</span>
          <input
            {...form.register("zip")}
            className={classNames("input input-bordered", {
              "input-error": form.formState.errors.zip?.message,
            })}
            autoComplete="postal-code"
          />
          {!!form.formState.errors.zip?.message && (
            <div className="text-xs text-error">
              {form.formState.errors.zip?.message}
            </div>
          )}
        </label>
      </div>

      <div className="flex-col flex gap-2 md:flex-row">
        <button className="md:flex-1 btn btn-error" disabled={isLoading}>
          Cancel
        </button>
        <button
          className="md:flex-1 btn btn-primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Submit"}
        </button>
      </div>
    </form>
  );
};
