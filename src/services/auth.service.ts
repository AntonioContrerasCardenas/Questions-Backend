import { Document, HydratedDocument, Types } from 'mongoose'
import { IUser, User } from '../models/Users'
import { Question } from '../models/Question'

const registerS = async (name: string, email: string, password: string) => {
  const existUser = await User.findOne({ email })
  if (existUser) {
    throw new Error('User already exists')
  }
  const user = new User({ name, email, password })
  await user.save()
  return user.toObject()
}

const loginS = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = await user.generateAuthToken()
  console.log({ token })
  return { user: user.toObject(), token }
}

const logOutS = async (tokenS: string, user: HydratedDocument<IUser>) => {
  user.tokens = user.tokens.filter((token) => token.token !== tokenS)
  await user.save()
}

const logOutAllS = async (user: HydratedDocument<IUser>) => {
  user.tokens = []
  await user.save()
}

export { registerS, loginS, logOutS, logOutAllS }
