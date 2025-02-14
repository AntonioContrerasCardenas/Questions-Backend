import express from 'express'
import {
  login,
  logout,
  logoutAll,
  register,
} from '../controllers/auth.controller'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout)
router.get('/logoutAll', auth, logoutAll)

export default router
