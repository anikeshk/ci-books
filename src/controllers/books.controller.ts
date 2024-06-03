import { Request, Response } from 'express';

import { Book } from '../models/books.model';

export const BookController = {
  createBook: async (req: Request, res: Response) => {
    const { title, description, published, pages, author } = req.body;
    if (!title || !author || published === undefined || !pages || !description) {
      return res.status(400).json({ status: 'error', message: 'Invalid input' });
    }
    try {
      const book = new Book({
        title,
        description,
        published,
        pages,
        author,
      });
      const newBook = await book.save();
      const data = {
        id: newBook._id,
        title: newBook.title,
        description: newBook.description,
        published: newBook.published,
        pages: newBook.pages,
        createdAt: newBook.createdAt,
        updatedAt: newBook.updatedAt,
      };
      return res.status(200).json({ data, status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Internal Sever Error' });
    }
  },
  getBooks: async (req: Request, res: Response) => {
    try {
      const total = await Book.countDocuments({});
      const books = await Book.find({});
      const data = books.map((book) => {
        return {
          id: book._id,
          title: book.title,
          description: book.description,
          published: book.published,
          pages: book.pages,
          author: book.author,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
        };
      });
      return res.status(200).json({ data, total, status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Internal Sever Error' });
    }
  },
  updateBook: async (req: Request, res: Response) => {
    try {
      const { title, description, published, pages, author } = req.body;
      const { id } = req.params;
      if (!title || !author || published === undefined || !pages || !description) {
        return res.status(400).json({ status: 'error', message: 'Invalid input' });
      }
      const newBook = await Book.findOneAndUpdate(
        { _id: id },
        { title, description, published, pages, author },
        { new: true }
      );
      if (newBook !== null) {
        const data = {
          id: newBook._id,
          title: newBook.title,
          description: newBook.description,
          published: newBook.published,
          pages: newBook.pages,
          author: newBook.author,
          createdAt: newBook.createdAt,
          updatedAt: newBook.updatedAt,
        };
        return res.status(200).json({ data, status: 'success' });
      }
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Internal Sever Error' });
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Book.deleteOne({ _id: id });
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', code: 500, message: 'Internal Sever Error' });
    }
  },
};
