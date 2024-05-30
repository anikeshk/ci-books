import express, { Express } from 'express';

import { notFoundMiddleware } from './middlewares/notfound.middleware';
import { router } from './routes/index.routes';

const app: Express = express();

app.use(express.json(), express.urlencoded({ extended: true }), router, notFoundMiddleware);

export default app;
