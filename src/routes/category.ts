import express from 'express'

import { getAllCategories } from '../controllers/category.controller'

const router = express.Router()

//Para llamar a este endpoint usar una peticion get con una url como esta: http:localhost:3000/api/categories
router.get('/', getAllCategories)

export default router
