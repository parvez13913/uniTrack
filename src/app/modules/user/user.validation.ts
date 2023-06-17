import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date Of Birth is Required',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood Group is Required',
      }),
    }),
  }),
});

export const UserValidatio = {
  createUserZodSchema,
};
