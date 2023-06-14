import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = AcademicDepartment.create(payload);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
};
