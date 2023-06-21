import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { studentSearchableFields } from './student.constants';
import { IStudent, IStudentsFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondetions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(whereCondetions)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondetions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudents = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudents,
};
