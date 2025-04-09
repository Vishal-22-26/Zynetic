const Book = require('../models/bookModel');
const AppError = require('../utils/appError');

exports.getAllBooks = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(field => delete queryObj[field]);
    
    let query = Book.find(queryObj);
    
    if (req.query.search) {
      query = query.find({ $text: { $search: req.query.search } });
    }
    
    if (req.query.rating) {
      const rating = parseFloat(req.query.rating);
      if (!isNaN(rating)) {
        query = query.find({ rating: { $gte: rating } });
      }
    }
    
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);
    
    const books = await query;
    
    const total = await Book.countDocuments(queryObj);
    
    res.status(200).json({
      status: 'success',
      results: books.length,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: {
        books
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        book
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    
    const newBook = await Book.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    
    if (book.createdBy.toString() !== req.user.id) {
      return next(new AppError('You do not have permission to update this book', 403));
    }
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        book: updatedBook
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    
    if (book.createdBy.toString() !== req.user.id) {
      return next(new AppError('You do not have permission to delete this book', 403));
    }
    
    await Book.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};