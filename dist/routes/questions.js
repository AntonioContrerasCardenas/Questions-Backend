"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("../controllers/question.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Para llamar a este endpoint usar una peticion get con una url como esta: http://localhost:3000/api/questions/random?limit=3
router.get('/random', auth_1.auth, question_controller_1.getRandomQuestions);
//Para llamar a este endpoint usar una peticion get con una url como esta: http:localhost:3000/api/questions/category?category=science
router.get('/category', auth_1.auth, question_controller_1.getQuestionsByCategory);
router.get('/category/paginated', auth_1.auth, question_controller_1.getQuestionsByCategoryPaginated);
router.get('/count/:category', auth_1.auth, question_controller_1.getQuestionCountByCategory);
router.post('/create', auth_1.auth, question_controller_1.createQuestion);
router.get('/personalQuestions', auth_1.auth, question_controller_1.getAllQuestionsOfUser);
router.delete('/question/:questionId', auth_1.auth, question_controller_1.deleteQuestion);
exports.default = router;
