import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()
const port = process.env.port || 3003

let pingCount = 0

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'ping.txt')

const getFile = async () => {
  await fs.readFile(filePath, (err, data) => {
    if (err) return console.log('error', err)
    pingCount = Number(data.toString())
  })
}

const findAFile = async () => {
  await new Promise((res) => fs.mkdir(directory, (_err) => res()))

  await fs.writeFile(filePath, pingCount.toString(), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('writing to file now', pingCount)
  })
}

app.get('/', async (_req, res) => {
  pingCount++
  await findAFile()
  res.send(`pong ${pingCount}`)
})

app.listen(port, async () => {
  await getFile()
  console.log(`server started on port ${port}`)
})
