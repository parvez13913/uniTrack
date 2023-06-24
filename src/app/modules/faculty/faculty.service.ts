import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id });
  return result;
};

export const FacultyService = {
  getSingleFaculty,
};
