import dotenv from '@dotenvx/dotenvx';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

import authRouter from './api/auth/auth.router';
import userRouter from './api/user/user.router';
import { DatabaseConfig } from './configs/db.config';
import { GlobalRoutes } from './configs/global.config';
import serverConfig from './configs/server.config';
import {
  globalErrorHandler,
  notFoundRouteHandler
} from './errors/errorHandlers';
import RouteLogger from './middlewares/RouteLogger';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.set({ debug: true });
  mongoose.connect(DatabaseConfig.MONGO_PROD_URI);
}

app.use(express.json()); // returns mdlwr to handle request with json data

app.use(RouteLogger);

app.use(GlobalRoutes.USERS, userRouter);
app.use(GlobalRoutes.AUTH, authRouter);

// for routes which is not supposed by our app, we use not-found router to throw an error
app.use('*', notFoundRouteHandler);

// app will use the handler as global try-catch handler
app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(serverConfig.PORT, () => {
    //eslint-disable-next-line no-console
    console.log(
      `Server is listening on http://localhost:${serverConfig.PORT}/`
    );
  });
}

export default app;
