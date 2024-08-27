import { z } from 'zod';

const userSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.number(),
    address: z.string(),
  }),
});

const loginSchemaValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }).email(),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

const updateAccountSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    phone: z.number(),
    address: z.string(),
  }),
});

export {
  userSchemaValidation,
  updateAccountSchemaValidation,
  loginSchemaValidation,
};
