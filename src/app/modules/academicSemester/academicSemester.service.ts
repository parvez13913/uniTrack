import { IAcademicSemester } from './academicSemester.interface';
import { AcamemicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcamemicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
