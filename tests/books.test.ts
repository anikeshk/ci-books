import { Request, Response } from 'express';
import { BookController } from '../src/controllers/books.controller';
import { Book } from '../src/models/books.model';

jest.mock('../src/models/books.model', () => ({
  Book: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

describe('BookController', () => {
  describe('createBook', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let status: jest.Mock;
    let json: jest.Mock;

    beforeEach(() => {
      req = {
        body: {
          title: 'Test Title',
          description: 'Test Description',
          published: false,
          pages: 300,
          author: 'Test Author',
        },
      };
      status = jest.fn().mockReturnThis();
      json = jest.fn();
      res = {
        status,
        json,
      };
      (Book as any).mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create a new book and return it with a 200 status', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: 'book123',
        title: 'Test Title',
        description: 'Test Description',
        published: false,
        pages: 300,
        author: 'Test Author',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      (Book as any).mockImplementation(() => ({
        save: mockSave,
      }));

      await BookController.createBook(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        data: {
          id: 'book123',
          title: 'Test Title',
          description: 'Test Description',
          published: false,
          pages: 300,
          author: 'Test Author',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        status: 'success',
      });
    });

    it('should return 400 if content is missing', async () => {
      req.body.title = '';

      await BookController.createBook(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Invalid input',
      });
    });

    it('should return 500 if an error occurs', async () => {
      const error = new Error('Test error');
      (Book as any).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await BookController.createBook(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Sever Error',
      });
    });
  });
});
