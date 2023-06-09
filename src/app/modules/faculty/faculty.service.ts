import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyfilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  filters: IFacultyfilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableFields.map(fields => ({
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

  const sortConditions: { [keys: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondetions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Faculty.find(whereCondetions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereCondetions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id });
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExit = await Faculty.findOne({ id });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });

  return result;
};

export const FacultyService = {
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
};
