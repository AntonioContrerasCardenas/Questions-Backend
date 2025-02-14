import { Request, Response } from 'express'
import {
  loginS,
  logOutAllS,
  logOutS,
  registerS,
} from '../services/auth.service'

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const {
      tokens,
      _id,
      password: _,
      ...user
    } = await registerS(name, email, password)
    res.status(201).send(user)
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(
        (err: any) => err.message
      )[0]
      return res.status(400).send({ error: errorMessages })
    }
    res.status(400).send({ error: error.message })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { user, token } = await loginS(email, password)
    const { password: _, tokens, _id, ...restUser } = user
    res.status(200).send({ user: restUser, token })
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    const { token, user } = req
    if (!token || !user) {
      res.status(400).send({ error: 'No user foun' })
      return
    }
    await logOutS(token, user)
    res.status(200).send({ message: 'Logged out successfully' })
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
}

const logoutAll = async (req: Request, res: Response) => {
  try {
    const { user } = req
    if (!user) {
      res.status(400).send({ error: 'No user foun' })
      return
    }
    await logOutAllS(user)
    res.status(200).send({ message: 'Logged out all successfully' })
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
}

export { register, login, logout, logoutAll }
