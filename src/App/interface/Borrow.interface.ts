import { Types } from 'mongoose';
import { Book } from './../models/book.models';
export type TborrowBook={

    book:Types.ObjectId,
    quantity:number,
    dueDate:Date,
}