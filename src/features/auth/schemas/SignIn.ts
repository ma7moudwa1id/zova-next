import z, { email } from "zod";

export const schema = z.object({
  email: z.email({ error: "email is invalid" }).nonempty("email is required"),
  password: z.string().nonempty("password is required"),
});

export type signInValues = z.infer<typeof schema>;
