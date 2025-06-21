import express  from 'express';
import { Book } from '../models/book.models';


export const bookRoutes=express.Router()



bookRoutes.post("/books",async(req,res)=>{
const body= req.body

const  book= await Book.create(body)
res.status(201).json({
   "success": true,
  "message": "Book created successfully",
  "data":book
})


})

bookRoutes.get("/books",async(req,res)=>{
const {filter,sort,limit,sortBy }=req.query
const sortOrder:number=sort=== "asc"?1:-1
// const sortBy:any=req.query.sortBy

const pipeline:any[]=[]


if (filter) {
  pipeline.push({$match:{"genre":filter}})
}
  
 pipeline.push({ $sort: { [sortBy as string ]:sortOrder } })
if (limit) {
  pipeline.push ({$limit:parseInt(limit as string)||10})
}



const  book= await Book.aggregate(pipeline)
res.status(201).json({
   "success": true,
  "message": "Book retrieved  successfully",
  "data":book
})


})



bookRoutes.get("/books/:bookId",async(req,res)=>{
const bookId= req.params.bookId

const  book= await Book.findById(bookId)
res.status(201).json({
   "success": true,
  "message": "Book retrieved  successfully",
  "data":book
})


})


bookRoutes.patch("/books/:bookId",async(req,res)=>{
const bookId= req.params.bookId
const updateData=req.body

const  book= await Book.findByIdAndUpdate(bookId,updateData,{new:true})
res.status(201).json({
   "success": true,
  "message": "Book updated   successfully",
  "data":book
})


})

bookRoutes.delete("/books/:bookId",async(req,res)=>{
const bookId= req.params.bookId

const  book= await Book.findByIdAndDelete(bookId, {new:true})
res.status(201).json({
   "success": true,
  "message": "Book deleted   successfully",
  "data":null
})


})




