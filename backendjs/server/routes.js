import authRouter from './api/controllers/auth/router';
import groupRouter from './api/controllers/group/router';
import authenticate from './api/middlewares/authenticate';
import user from './api/middlewares/user';

export default function routes(app) {
  app.use('/api/v1/auth', authenticate, authRouter);
  app.use('/api/v1/group', authenticate, user, groupRouter);
}
