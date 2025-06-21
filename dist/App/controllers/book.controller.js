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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield book_models_1.Book.create(body);
    res.status(201).json({
        "success": true,
        "message": "Book created successfully",
        "data": book
    });
}));
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort, limit, sortBy } = req.query;
    const sortOrder = sort === "asc" ? 1 : -1;
    // const sortBy:any=req.query.sortBy
    const pipeline = [];
    if (filter) {
        pipeline.push({ $match: { "genre": filter } });
    }
    pipeline.push({ $sort: { [sortBy]: sortOrder } });
    if (limit) {
        pipeline.push({ $limit: parseInt(limit) || 10 });
    }
    const book = yield book_models_1.Book.aggregate(pipeline);
    res.status(201).json({
        "success": true,
        "message": "Book retrieved  successfully",
        "data": book
    });
}));
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_models_1.Book.findById(bookId);
    res.status(201).json({
        "success": true,
        "message": "Book retrieved  successfully",
        "data": book
    });
}));
exports.bookRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updateData = req.body;
    const book = yield book_models_1.Book.findByIdAndUpdate(bookId, updateData, { new: true });
    res.status(201).json({
        "success": true,
        "message": "Book updated   successfully",
        "data": book
    });
}));
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_models_1.Book.findByIdAndDelete(bookId, { new: true });
    res.status(201).json({
        "success": true,
        "message": "Book deleted   successfully",
        "data": null
    });
}));
