"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
//Para llamar a este endpoint usar una peticion get con una url como esta: http:localhost:3000/api/categories
router.get('/', category_controller_1.getAllCategories);
exports.default = router;
