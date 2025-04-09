const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateBookInput } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(validateBookInput, bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(validateBookInput, bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;