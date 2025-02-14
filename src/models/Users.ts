import { HydratedDocument, model, Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  tokens: { token: string }[]
  comparePassword(password: string): Promise<boolean>
  generateAuthToken(): string
}

const UsersSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: true,
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    validate: {
      validator: (value: string) => /^[a-zA-Z\s]+$/.test(value),
      message: 'Name must only contain letters and spaces',
    },
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    match: [/\d/, 'Password must contain at least one number'],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

UsersSchema.virtual('question', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'userId',
})

UsersSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<IUser>

  if (user.isModified('password')) {
    const saltRounds = 10
    const hash = await bcrypt.hash(user.password, saltRounds)
    user.password = hash
  }

  next()
})

UsersSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

UsersSchema.methods.generateAuthToken = async function () {
  const user = this as HydratedDocument<IUser>
  const token = jwt.sign(
    { _id: user._id.toString(), email: user.email },
    JWT_SECRET || 'secreto',
    { expiresIn: '2d' }
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

export const User = model<IUser>('User', UsersSchema)
