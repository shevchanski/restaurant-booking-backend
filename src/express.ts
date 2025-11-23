import express from "express";

import apiRouter from "./api/routes";
import {
  globalErrorHandler,
  notFoundRouteHandler,
} from "./errors/errorHandlers";
import RouteLogger from "./middlewares/RouteLogger";

const app = express();

app.use(RouteLogger);

app.use("/api/v1", apiRouter);

// to support backward compatibility
app.use(apiRouter);

// for routes which is not supposed by our app, we use not-found router to throw an error
app.use(notFoundRouteHandler);
// app will use the handler as global try-catch handler
app.use(globalErrorHandler);

export default app;
