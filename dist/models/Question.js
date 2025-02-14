"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.options = [...doc.options].sort(() => Math.random() - 0.5);
            return ret;
        },
    },
});
exports.Question = (0, mongoose_1.model)('Question', QuestionSchema);
