import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'This is Required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
};
