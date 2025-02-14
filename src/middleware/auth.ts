import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config'
import { User } from '../models/Users'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new Error('No token provided')
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      _id: string
      email: string
    }

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new Error('User not found')
    }

    req.user = user
    req.token = token

    next()
  } catch (error) {
    console.log(error)

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).send({ error: 'Token expired' })
      return
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send({ error: 'Invalid token' })
      return
    }

    res.status(401).send({ error: 'Authentication failed' })
  }
}

export { auth }
