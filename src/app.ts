import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import serverConfig from './configs/server.config';
import {
  globalErrorHandler,
  notFoundRouteHandler
} from './errors/errorHandlers';

const app = express();

// for routes which is not supposed by our app, we use not-found router to throw an error
app.use('*', notFoundRouteHandler);

// app will use the handler as global try-catch handler
app.use(globalErrorHandler);

app.listen(serverConfig.PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${serverConfig.PORT}/`);
});
