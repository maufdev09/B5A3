import express, { Request, Response } from "express";
import { Book } from "../models/book.models";
import { BorrowBook } from "../models/Borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/borrow", async (req:Request, res:Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);


if (!book) {
   return res.status(400).json({
        success: false,
        message: "Book not found",
        data: null,
      }); 
}


    if ((book?.copies as number) < quantity) {
    return res.status(400).json({
        success: false,
        message: "Not enough copies Available",
        data: null,
      });
    }

    book.copies  -= quantity

    if (book?.copies == 0) {
      book.available = false;
    }


   await book?.save();


const Borrow= await BorrowBook.create(req.body)


    res.status(201).json({
      success: true,
      message: "Book borrowed   successfully",
      data: Borrow,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occured ",
    });
  }
});



borrowRoutes.get("/borrow",async(req,res)=>{

try {
  const Borrow= await BorrowBook.aggregate([
  {$group:{
    _id:"$book",
    totalQuantity:{$sum:"$quantity"}
  }},
  {
    $lookup:{
      from:"books",
      localField:"_id",
      foreignField:"_id",
      as:"bookInfo"
    },
  },
  {
    $unwind:"$bookInfo",
  },
  {
    $project:{
      _id:0,
      book:{
        title:"bookInfo.title",
        isbn:"$bookInfo.isbn"
      },
      totalQuantity:1
    }

  }
  

])

res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: Borrow,
    })
} catch (error:any) {
   res.status(500).json({
      success: false,
      message: error.message || "An error occured ",
    });
}

})


