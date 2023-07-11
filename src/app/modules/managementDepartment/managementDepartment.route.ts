import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  ManagementDepartmentController.createDepartment
);

router.get('/', ManagementDepartmentController.getAllDepartment);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.patch('/:id', ManagementDepartmentController.updateDepartment);
router.delete('/:id', ManagementDepartmentController.deleteDepartment);

export const ManagemantDepartmentRoute = router;
