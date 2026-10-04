import z from "zod";

export const schema = z
  .object({
    name: z.string().nonempty({ error: "Name is required" }).min(3),
    email: z
      .email({ error: "email is invalid" })
      .nonempty({ error: "email is required" }),
    password: z
      .string()
      .nonempty({ error: "password is required" })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number" })
      .regex(/[!@#$%^&_*]/, {
        error: "Password must contain at least one special character",
      }),
    rePassword: z.string().nonempty({ error: "confirm password is required" }),
    phone: z.string().nonempty({ error: "phone is required" }).regex(/^01[0125][0-9]{8}$/,{error:"enter eg number"}),
    terms: z.boolean().refine((val)=>val===true,{error:"please accept the terms"}),
  })
  .refine(
    (value) => {
      if (value.password === value.rePassword) {
        return true;
      }
    },
    {
      error: "Confirm password must match your password",
      path: ["rePassword"],
    },
  );

export type signUpvalues = z.infer<typeof schema>;
