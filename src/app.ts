import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import serverConfig from './configs/server.config';
import {
  globalErrorHandler,
  notFoundRouteHandler
} from './errors/errorHandlers';
import userRouter from './api/user/user.router';
import mongoose from 'mongoose';
import { DatabaseConfig } from './configs/db.config';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.set({ debug: true });
  mongoose.connect(DatabaseConfig.MONGO_PROD_URI);
}

app.use(express.json()); // returns mdlwr to handle request with json data

app.use('/users', userRouter);

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
