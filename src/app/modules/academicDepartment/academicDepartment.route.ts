import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  AcademicDepartmentController.createDepartment
);
router.get('/', AcademicDepartmentController.getAllDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch('/:id', AcademicDepartmentController.updateDepartment);

export const AcademicDepartmentRoutes = router;
