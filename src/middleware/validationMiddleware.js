const AppError = require('../utils/appError');

exports.validateBookInput = (req, res, next) => {
  const { title, author, category, price, rating, publishedDate } = req.body;
  const errors = [];

  if (!title) errors.push('Title is required');
  if (!author) errors.push('Author is required');
  if (!category) errors.push('Category is required');
  if (price === undefined) errors.push('Price is required');
  if (!publishedDate) errors.push('Published date is required');

  if (price !== undefined && (isNaN(price) || price < 0)) {
    errors.push('Price must be a non-negative number');
  }

  if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 5)) {
    errors.push('Rating must be a number between 0 and 5');
  }

  if (publishedDate && isNaN(new Date(publishedDate).getTime())) {
    errors.push('Published date must be a valid date');
  }

  if (errors.length > 0) {
    return next(new AppError(`Validation error: ${errors.join(', ')}`, 400));
  }

  next();
};