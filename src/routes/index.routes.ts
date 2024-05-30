import { Router } from 'express';

import { HealthRouter } from './health.routes';
import { BookRouter } from './books.routes';

const router: Router = Router();

router.use('/health', HealthRouter);
router.use('/books', BookRouter);

export { router };
