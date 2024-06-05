import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

import fileUpload from 'express-fileupload';
import authRouter from './api/auth/auth.router';
import fileRouter from './api/file/file.router';
import resRouter from './api/restaurant/res.router';
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
app.use(fileUpload());

app.use(RouteLogger);

app.use(GlobalRoutes.USERS, userRouter);
app.use(GlobalRoutes.AUTH, authRouter);
app.use(GlobalRoutes.RESTAURANTS, resRouter);
app.use(GlobalRoutes.FILES, fileRouter);

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
