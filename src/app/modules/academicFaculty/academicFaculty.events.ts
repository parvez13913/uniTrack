import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constants';
import {
  AcademicFacultyCreatedEvent,
  AcademicFacultyDeletedEvent,
  AcademicFacultyUpdatedEvent,
} from './academicFaculty.interface';
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
      const data: AcademicFacultyUpdatedEvent = JSON.parse(event);

      await AcademicFacultyService.updateAcademicFacultyFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_DELETED,
    async (event: string) => {
      const data: AcademicFacultyDeletedEvent = JSON.parse(event);

      await AcademicFacultyService.deleteAcademicFacultyFromEvent(data?.id);
    }
  );
};

export default initAcademicFacultyEvents;
