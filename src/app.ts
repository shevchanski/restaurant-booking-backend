import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import { DatabaseConfig } from "./configs/db.config";
import serverConfig from "./configs/server.config";
import app from "./express";

if (process.env.NODE_ENV !== "test") {
  mongoose.set({ debug: true });
  mongoose.connect(DatabaseConfig.MONGO_PROD_URI);
}

if (process.env.NODE_ENV !== "test") {
  app.listen(serverConfig.PORT, () => {
    // biome-ignore lint/suspicious/noConsole: used to log listening info of the server
    console.log(
      `Server is listening on http://localhost:${serverConfig.PORT}/`,
    );
  });
}

export default app;
