import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { todos } from './todos'
import cors from 'cors'

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.set('view engine', 'ejs')
const port = process.env.PORT || 3000

const directory = path.join('/', 'usr', 'src', 'app', 'files')
let filePath = ''

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false)
      return res(true)
    })
  })

const getImage = async () => {
  const todayString = new Date().toISOString().split('T')[0]
  filePath = path.join(directory, `image_${todayString}.jpg`)
  if (await fileAlreadyExists()) return

  await new Promise((res) => fs.mkdir(directory, (err) => res()))
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream',
  })
  console.log('saving file ', filePath)
  response.data.pipe(fs.createWriteStream(filePath))
}

app.get('/api/randomImage', async (_req, res) => {
  await getImage()
  res.sendFile(filePath)
})

app.get('/api/todos', (_req: Request, res: Response) => {
  res.json(todos)
})

app.post('/api/todos', (req: Request, res: Response) => {
  const newTodo = { ...req.body }
  newTodo.id = todos[todos.length - 1].id + 1
  todos.push(newTodo)
  res.json(newTodo)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
