import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemester.constant';
import { IAcademicSemesterCreateEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (event: string) => {
      const data: IAcademicSemesterCreateEvent = JSON.parse(event);
      await AcademicSemesterService.createSemesterFromEvent(data);
    }
  );
};

export default initAcademicSemesterEvents;
