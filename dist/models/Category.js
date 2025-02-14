"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
            return returnedObject;
        },
    },
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
