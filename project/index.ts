import express from 'express'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { todos } from './todos'

const app = express()
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

app.get('/', (_req, res) => {
  res.render('index', { todos: todos })
})

app.get('/randomImage', async (_req, res) => {
  await getImage()
  res.sendFile(filePath)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
