import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_FACULTY_CREATED } from './academicFaculty.constants';
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
};

export default initAcademicFacultyEvents;
