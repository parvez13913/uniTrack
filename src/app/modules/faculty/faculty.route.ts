import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.getAllFaculty
);

export const FacultyRoutes = router;
