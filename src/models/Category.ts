import { Document, model, Schema } from 'mongoose'

export interface CategoryI extends Document {
  name: string
}

const CategorySchema = new Schema<CategoryI>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        delete returnedObject.__v
        return returnedObject
      },
    },
  }
)

export const Category = model<CategoryI>('Category', CategorySchema)
