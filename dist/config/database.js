"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const connect = mongoose_1.default.connect('mongodb+srv://worismimiyete:z4Z7YLjJhbC435wR@cluster0.82nev0r.mongodb.net/week-9-task');
        console.log(`MongoDB Connected Successfully`);
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectDatabase = connectDatabase;
