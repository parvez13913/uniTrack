import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  ManagementDepartmentController.createDepartment
);

router.get('/', ManagementDepartmentController.getAllDepartment);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);

export const ManagemantDepartmentRoute = router;
