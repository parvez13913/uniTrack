import { Model } from 'mongoose';

export type FacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: FacultyName;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  emergencyContactNo: string;
  designation: string;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
