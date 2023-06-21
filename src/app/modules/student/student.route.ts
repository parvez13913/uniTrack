import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudents);
router.get('/', StudentController.getAllStudents);

export const StudentsRoutes = router;
