import { HydratedDocument } from 'mongoose'
import { Category } from '../models/Category'
import { Question } from '../models/Question'
import { IUser } from '../models/Users'

export const fetchRandomQuestion = async () => {
  //   const numberQuestions = await Question.countDocuments()
  //   const random = Math.floor(Math.random() * numberQuestions)
  return Question.aggregate([{ $sample: { size: 1 } }])
  //return Question.findOne()
}

export const fetchRandomQuestions = async (limit: number) => {
  const numberQuestions = await Question.countDocuments()
  if (limit > numberQuestions)
    throw new Error('Limit is greater than the number of questions')

  return Question.aggregate([{ $sample: { size: limit } }])
}

export const fetchQuestionByCategory = async (categoryId: string) => {
  const category = await Category.findOne({ name: categoryId })

  if (!category) throw new Error('Category not found')

  return Question.findOne({ categoryId: category })
}

export const fetchQuestionsByCategory = async (
  categoryId: string,
  limit: number
) => {
  const category = await Category.findOne({ name: categoryId })
  return Question.find({ categoryId: category }).limit(limit)
}

export const fetchQuestionsByCategoryWithPagination = async (
  category: string,
  page: number,
  totalRequested: number,
  perPage: number,
  user: HydratedDocument<IUser>
) => {
  const categoryFound = await Category.findOne({ _id: category })

  if (!categoryFound) throw new Error('Category not found')

  const availableQuestions = await Question.countDocuments({
    categoryId: categoryFound._id,
    $or: [{ userId: null }, { userId: user._id }],
  })

  // Si quiero 20 preguntas y solo hay 10 disponibles, solo devuelvo 10
  const totalQuestions = Math.min(availableQuestions, totalRequested)
  const totalPages = Math.ceil(totalQuestions / perPage)

  const skip = (page - 1) * perPage

  //Por si quiero 2 preguntas por pagina pero solo tengo 1 disponible, solo devuelvo 1
  const questionsToFetch = Math.min(perPage, totalQuestions - skip)
  if (questionsToFetch <= 0) {
    return { questions: [], totalPages }
  }

  const paginatedQuestions = await Question.find({
    categoryId: categoryFound._id,
    $or: [{ userId: null }, { userId: user._id }],
  })
    .skip(skip)
    .limit(questionsToFetch)

  return { questions: paginatedQuestions, totalPages }
}

export const createQuestionS = async (
  categoryId: string,
  question: string,
  answer: string,
  options: string[],
  user: HydratedDocument<IUser>
) => {
  const category = await Category.findOne({ _id: categoryId })

  if (!category) throw new Error('Category not found')

  const userId = user._id
  const questionToCreate = new Question({
    question,
    answer,
    options,
    categoryId: category._id,
    userId,
  })

  await questionToCreate.save()

  return { question: questionToCreate.toObject() }
}
