import { Document, HydratedDocument } from 'mongoose'
import { IUser } from '../src/models/Users'

// Extiende la interfaz Request de Express
declare module 'express' {
  interface Request {
    user?: HydratedDocument<IUser>
    token?: string
  }
}
