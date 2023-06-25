import { z } from 'zod';
import { gender } from './faculty.constant';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    email: z.string().email().optional(),
    emergencyContactNo: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
