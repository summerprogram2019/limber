import examplesRouter from './api/controllers/examples/router';
import authRouter from './api/controllers/auth/router';
import authenticate from './api/middlewares/authenticate';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/auth', authenticate, authRouter);
}
