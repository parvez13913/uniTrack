import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  ManagementDepartmentController.createDepartment
);

router.get('/', ManagementDepartmentController.getAllDepartment);

export const ManagemantDepartmentRoute = router;
