import { Schema, model } from 'mongoose';

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    published: { type: Boolean, default: false },
    pages: Number,
    author: { type: String, required: true },
  },
  { timestamps: true }
);

export const Book = model('Book', BookSchema);
