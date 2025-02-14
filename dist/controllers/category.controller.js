"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const Category_1 = require("../models/Category");
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category_1.Category.find({});
        res.status(200).send({ categories });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
};
exports.getAllCategories = getAllCategories;
