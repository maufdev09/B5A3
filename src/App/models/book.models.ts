import { model, Schema } from "mongoose";
import { Tbook } from "../interface/book.interface";


const bookSchema= new Schema<Tbook>({
title:{type:String, required:true, trim:true },
author:{type:String, required:true, trim:true },
genre:{type:String, enum:["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"]},
isbn:{type:String, required:true,  },
description:{type:String, required:true, },
copies:{type:Number, required:true, },
available:{type:Boolean, required:true,default:true },

},
{
    timestamps:true
}
)




export const Book =model<Tbook>("Book", bookSchema)