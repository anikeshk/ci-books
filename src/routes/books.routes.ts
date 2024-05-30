import { Router } from 'express';

import { BookController } from '../controllers/books.controller';

const router: Router = Router();

router.post('/', BookController.createBook);
router.get('/', BookController.getBooks);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export { router as BookRouter };
