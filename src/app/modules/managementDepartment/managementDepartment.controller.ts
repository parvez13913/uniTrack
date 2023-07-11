import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
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

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ManagementDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments retrieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const result = await ManagementDepartmentService.updateDepartment(
    id,
    updateData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments update successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments delete successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
