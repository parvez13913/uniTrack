import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterTitels = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcademicSemesterTitels;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
