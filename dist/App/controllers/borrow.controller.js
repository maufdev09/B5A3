"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
const Borrow_model_1 = require("../models/Borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_models_1.Book.findById(bookId);
        if (!book) {
            return res.status(400).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        if ((book === null || book === void 0 ? void 0 : book.copies) < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies Available",
                data: null,
            });
        }
        book.copies -= quantity;
        if ((book === null || book === void 0 ? void 0 : book.copies) == 0) {
            book.available = false;
        }
        yield (book === null || book === void 0 ? void 0 : book.save());
        const Borrow = yield Borrow_model_1.BorrowBook.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed   successfully",
            data: Borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occured ",
        });
    }
}));
exports.borrowRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Borrow = yield Borrow_model_1.BorrowBook.aggregate([
            { $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                } },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: Borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occured ",
        });
    }
}));
