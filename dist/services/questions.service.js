"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionS = exports.fetchQuestionsByCategoryWithPagination = exports.fetchQuestionsByCategory = exports.fetchQuestionByCategory = exports.fetchRandomQuestions = exports.fetchRandomQuestion = void 0;
const Category_1 = require("../models/Category");
const Question_1 = require("../models/Question");
const fetchRandomQuestion = async () => {
    //   const numberQuestions = await Question.countDocuments()
    //   const random = Math.floor(Math.random() * numberQuestions)
    return Question_1.Question.aggregate([{ $sample: { size: 1 } }]);
    //return Question.findOne()
};
exports.fetchRandomQuestion = fetchRandomQuestion;
const fetchRandomQuestions = async (limit) => {
    const numberQuestions = await Question_1.Question.countDocuments();
    if (limit > numberQuestions)
        throw new Error('Limit is greater than the number of questions');
    return Question_1.Question.aggregate([{ $sample: { size: limit } }]);
};
exports.fetchRandomQuestions = fetchRandomQuestions;
const fetchQuestionByCategory = async (categoryId) => {
    const category = await Category_1.Category.findOne({ name: categoryId });
    if (!category)
        throw new Error('Category not found');
    return Question_1.Question.findOne({ categoryId: category });
};
exports.fetchQuestionByCategory = fetchQuestionByCategory;
const fetchQuestionsByCategory = async (categoryId, limit) => {
    const category = await Category_1.Category.findOne({ name: categoryId });
    return Question_1.Question.find({ categoryId: category }).limit(limit);
};
exports.fetchQuestionsByCategory = fetchQuestionsByCategory;
const fetchQuestionsByCategoryWithPagination = async (category, page, totalRequested, perPage, user) => {
    const categoryFound = await Category_1.Category.findOne({ _id: category });
    if (!categoryFound)
        throw new Error('Category not found');
    const availableQuestions = await Question_1.Question.countDocuments({
        categoryId: categoryFound._id,
        $or: [{ userId: null }, { userId: user._id }],
    });
    // Si quiero 20 preguntas y solo hay 10 disponibles, solo devuelvo 10
    const totalQuestions = Math.min(availableQuestions, totalRequested);
    const totalPages = Math.ceil(totalQuestions / perPage);
    const skip = (page - 1) * perPage;
    //Por si quiero 2 preguntas por pagina pero solo tengo 1 disponible, solo devuelvo 1
    const questionsToFetch = Math.min(perPage, totalQuestions - skip);
    if (questionsToFetch <= 0) {
        return { questions: [], totalPages };
    }
    const paginatedQuestions = await Question_1.Question.find({
        categoryId: categoryFound._id,
        $or: [{ userId: null }, { userId: user._id }],
    })
        .skip(skip)
        .limit(questionsToFetch);
    return { questions: paginatedQuestions, totalPages };
};
exports.fetchQuestionsByCategoryWithPagination = fetchQuestionsByCategoryWithPagination;
const createQuestionS = async (categoryId, question, answer, options, user) => {
    const category = await Category_1.Category.findOne({ _id: categoryId });
    if (!category)
        throw new Error('Category not found');
    const userId = user._id;
    const questionToCreate = new Question_1.Question({
        question,
        answer,
        options,
        categoryId: category._id,
        userId,
    });
    await questionToCreate.save();
    return { question: questionToCreate.toObject() };
};
exports.createQuestionS = createQuestionS;
