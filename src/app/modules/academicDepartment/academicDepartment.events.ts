import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constants';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentUpdatedEvent,
} from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (event: string) => {
      const data: AcademicDepartmentCreatedEvent = JSON.parse(event);
      await AcademicDepartmentService.createAcademicDepartmentFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (event: string) => {
      const data: AcademicDepartmentUpdatedEvent = JSON.parse(event);
      await AcademicDepartmentService.updatedAcademicDepartmentFromEvent(data);
    }
  );
};

export default initAcademicDepartmentEvents;
