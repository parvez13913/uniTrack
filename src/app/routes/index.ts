import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagemantDepartmentRoute } from '../modules/managementDepartment/managementDepartment.route';
import { StudentsRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academicSemesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academicFaculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/managementDepartments',
    route: ManagemantDepartmentRoute,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
