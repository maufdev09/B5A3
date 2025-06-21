import express, { Request, Response } from "express";
import { bookRoutes } from "./App/controllers/book.controller";
import { borrowRoutes } from "./App/controllers/borrow.controller";
const app= express()
app.use(express.json())




app.use("/api", bookRoutes)
app.use("/api", borrowRoutes)





app.get("/",(req:Request,res:Response)=>{
res.send("Hello world")
})




export default app