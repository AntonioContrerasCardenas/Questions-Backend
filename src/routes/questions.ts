import express from 'express'
import {
  createQuestion,
  deleteQuestion,
  getAllQuestionsOfUser,
  getQuestionCountByCategory,
  getQuestionsByCategory,
  getQuestionsByCategoryPaginated,
  getRandomQuestions,
} from '../controllers/question.controller'
import { auth } from '../middleware/auth'

const router = express.Router()

// Para llamar a este endpoint usar una peticion get con una url como esta: http://localhost:3000/api/questions/random?limit=3
router.get('/random', auth, getRandomQuestions)
//Para llamar a este endpoint usar una peticion get con una url como esta: http:localhost:3000/api/questions/category?category=science
router.get('/category', auth, getQuestionsByCategory)
router.get('/category/paginated', auth, getQuestionsByCategoryPaginated)
router.get('/count/:category', auth, getQuestionCountByCategory)
router.post('/create', auth, createQuestion)
router.get('/personalQuestions', auth, getAllQuestionsOfUser)
router.delete('/question/:questionId', auth, deleteQuestion)
export default router
