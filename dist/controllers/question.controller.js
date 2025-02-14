"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.getAllQuestionsOfUser = exports.createQuestion = exports.getQuestionCountByCategory = exports.getQuestionsByCategoryPaginated = exports.getQuestionsByCategory = exports.getRandomQuestions = void 0;
const questions_service_1 = require("../services/questions.service");
const Question_1 = require("../models/Question");
const getRandomQuestions = async (req, res) => {
    try {
        const { limit } = req.query;
        const numericLimit = parseInt(limit);
        if (!numericLimit) {
            const question = await (0, questions_service_1.fetchRandomQuestion)();
            res.status(200).send({ questions: [question] });
            return;
        }
        const question = await (0, questions_service_1.fetchRandomQuestions)(+numericLimit);
        if (!question) {
            res.status(404).send({ error: 'An unexpected error occurred' });
            return;
        }
        res.status(200).send({ questions: question });
        return;
    }
    catch (error) {
        res.status(404).send({ error: error.message });
        return;
    }
};
exports.getRandomQuestions = getRandomQuestions;
const getQuestionsByCategory = async (req, res) => {
    try {
        const { category, limit } = req.query;
        const user = req.user;
        const categoryString = category;
        const limitString = limit;
        if (!limitString) {
            const question = await (0, questions_service_1.fetchQuestionByCategory)(categoryString);
            if (!question) {
                res.status(404).send('Not found');
                return;
            }
            res.status(200).send({ questions: [question] });
            return;
        }
        const question = await (0, questions_service_1.fetchQuestionsByCategory)(categoryString, +limitString);
        if (!question) {
            res.status(404).send('An unexpected error occurred');
            return;
        }
        res.status(200).send({ questions: question });
        return;
    }
    catch (error) {
        res.status(404).send({ error: error.message });
        return;
    }
};
exports.getQuestionsByCategory = getQuestionsByCategory;
const getQuestionsByCategoryPaginated = async (req, res) => {
    try {
        const { category, page = 1, total = 1, perPage = 2 } = req.query;
        const user = req.user;
        const categoryString = category;
        const numericPage = Number(page);
        const numericTotal = Number(total);
        const numericPerPage = Number(perPage);
        if (!categoryString) {
            res.status(404).send({ error: 'Category not found' });
            return;
        }
        const { questions, totalPages } = await (0, questions_service_1.fetchQuestionsByCategoryWithPagination)(categoryString, numericPage, numericTotal, numericPerPage, user);
        if (!questions || questions.length === 0) {
            res.status(200).send({ error: 'No have questions' });
            return;
        }
        res.status(200).send({ questions, totalPages });
        return;
    }
    catch (error) {
        res.status(404).send({ error: error.message });
        return;
    }
};
exports.getQuestionsByCategoryPaginated = getQuestionsByCategoryPaginated;
const getQuestionCountByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const user = req.user;
        const categoryString = category;
        if (!categoryString) {
            res.status(404).send({ error: 'Category not found' });
            return;
        }
        const count = await Question_1.Question.countDocuments({
            categoryId: categoryString,
            $or: [{ userId: null }, { userId: user._id }],
        });
        res.status(200).send({ count });
        return;
    }
    catch (error) {
        res.status(404).send({ error: error.message });
        return;
    }
};
exports.getQuestionCountByCategory = getQuestionCountByCategory;
const createQuestion = async (req, res) => {
    try {
        const { category, question, answer, options } = req.body;
        const categoryIdString = category;
        const questionString = question;
        const answerString = answer;
        const optionsString = options;
        if (!categoryIdString) {
            res.status(404).send({ error: 'Category not send' });
            return;
        }
        if (!questionString) {
            res.status(404).send({ error: 'Question not send' });
            return;
        }
        if (!answerString) {
            res.status(404).send({ error: 'Answer not send' });
            return;
        }
        if (!optionsString) {
            res.status(404).send({ error: 'Options not send' });
            return;
        }
        const user = req.user;
        if (!user) {
            res.status(404).send({ error: 'User not send' });
            return;
        }
        const questionResponse = await (0, questions_service_1.createQuestionS)(categoryIdString, questionString, answerString, optionsString, user);
        res.status(201).send({ question: questionResponse.question });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
};
exports.createQuestion = createQuestion;
const getAllQuestionsOfUser = async (req, res) => {
    try {
        const user = req.user;
        const questions = await Question_1.Question.find({
            userId: user._id,
        });
        res.status(200).send({ questions });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
};
exports.getAllQuestionsOfUser = getAllQuestionsOfUser;
const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const user = req.user;
        await Question_1.Question.deleteOne({ userId: user._id, _id: questionId });
        res.status(200).send({ message: 'Question deleted successfully' });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
};
exports.deleteQuestion = deleteQuestion;
