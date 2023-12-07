import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constants';
import { AcademicFacultyCreatedEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_CREATED,
    async (event: string) => {
      const data: AcademicFacultyCreatedEvent = JSON.parse(event);

      await AcademicFacultyService.createAcademicFacultyFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_UPDATED,
    async (event: string) => {
      const data: AcademicFacultyCreatedEvent = JSON.parse(event);

      await AcademicFacultyService.updateAcademicFacultyFromEvent(data);
    }
  );
};

export default initAcademicFacultyEvents;
