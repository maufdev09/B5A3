import { model, Schema, Types } from "mongoose";
import { Tbook } from "../interface/book.interface";
import { TborrowBook } from "../interface/Borrow.interface";

const borrowSchema = new Schema<TborrowBook>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const BorrowBook = model<TborrowBook>("BorrowBook", borrowSchema);
