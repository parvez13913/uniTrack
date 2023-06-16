import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { generateStudentId } from './app/modules/user/user.utils';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// global Error Handler
app.use(globalErrorHandler);

// Handle NotFound Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   code: '01',
//   year: '2023',
// };

// const testId = async () => {
//   const testId = await generateStudentId(academicSemester);
//   console.log(testId);
// };

// testId();

export default app;
