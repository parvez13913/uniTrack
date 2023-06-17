import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constants';

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
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date Of Birth is Required',
      }),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email(),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      contactNo: z.string({
        required_error: 'ContactNo is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is Required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is Required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father ContactNo is Required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is Required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is Required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother ContactNo is Required',
        }),
        address: z.string({
          required_error: 'Guardian Address is Required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is Required',
        }),
        occupation: z.string({
          required_error: 'Occupation is Required',
        }),
        contactNo: z.string({
          required_error: 'ContactNo is Required',
        }),
        address: z.string({
          required_error: 'Address is Required',
        }),
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidatio = {
  createUserZodSchema,
};
