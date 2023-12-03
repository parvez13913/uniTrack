import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterCreateEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  // Create
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (event: string) => {
      const data: IAcademicSemesterCreateEvent = JSON.parse(event);
      await AcademicSemesterService.createSemesterFromEvent(data);
    }
  );

  // update
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATED,
    async (event: string) => {
      const data = JSON.parse(event);
      await AcademicSemesterService.updateSemesterFromEvent(data);
    }
  );
};

export default initAcademicSemesterEvents;
