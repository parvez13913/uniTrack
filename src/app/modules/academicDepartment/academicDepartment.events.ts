import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_DEPARTMENT_CREATED } from './academicDepartment.constants';
import { AcademicDepartmentCreatedEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (event: string) => {
      const data: AcademicDepartmentCreatedEvent = JSON.parse(event);
      await AcademicDepartmentService.createAcademicDepartmentFromEvent(data);
    }
  );
};

export default initAcademicDepartmentEvents;
