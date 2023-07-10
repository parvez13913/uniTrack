import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...managementDepartmentData } = req.body;
  const result = await ManagementDepartmentService.createDepartment(
    managementDepartmentData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department created successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
};
