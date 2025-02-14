import express from 'express'
import questions from './routes/questions'
import auth from './routes/auth'
import cors from 'cors'
import { PORT } from './config/config'
import connectToDatabase from './config/db'
import seedDatabase from './config/seed'
import category from './routes/category'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/questions', questions)
app.use('/api/categories', category)
app.use('/api/auth', auth)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/seed', async (req, res) => {
  await seedDatabase()
  res.send('Seeded')
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectToDatabase()
  // descomentar esta linea en caso de querer crear la base de datos
  //await seedDatabase()
})
