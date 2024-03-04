import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import serverConfig from './configs/server.config';

const app = express();

app.listen(serverConfig.PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${serverConfig.PORT}/`);
});
