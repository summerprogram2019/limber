import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import authRouter from './api/controllers/auth/router';
import groupRouter from './api/controllers/group/router';
import authenticate from './api/middlewares/authenticate';
export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/auth', authenticate, authRouter);
  app.use('/api/v1/group', authenticate, groupRouter);
};
