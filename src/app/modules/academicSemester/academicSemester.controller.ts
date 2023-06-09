import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester is created Successfully!!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemister,
};
