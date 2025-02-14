import { Request, Response } from 'express'
import { Category } from '../models/Category'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({})
    res.status(200).send({ categories })
  } catch (error: any) {
    res.status(404).send({ error: error.message })
  }
}
