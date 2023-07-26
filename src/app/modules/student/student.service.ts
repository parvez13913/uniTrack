import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
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

const updateStudents = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExit = await Student.findOne({ _id: id });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtlocalGuardian`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });

  return result;
};

const deleteStudents = async (id: string): Promise<IStudent | null> => {
  const isExit = await Student.findOne({ _id: id });

  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  }
  const session = await mongoose.startSession();
  let newStudent = null;
  try {
    session.startTransaction();
    // Delete student first
    const student = await Student.findOneAndDelete({ id }).session(session);

    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }

    // Delete User
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    newStudent = student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
  return newStudent;
};
export const StudentService = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  updateStudents,
};
