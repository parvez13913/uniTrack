/*faculty: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is Required',
      }),
      middleName: z.string().optional(),
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
    contactNo: z.string({
      required_error: 'Contact number is Required',
    }),
    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email(),
    emergencyContactNo: z.string({
      required_error: 'Emergency Contact number is Required',
    }),
    designation: z.string({
      required_error: 'Designation is Required',
    }),
    profileImage: z.string().optional(),
  }),
}),*/
