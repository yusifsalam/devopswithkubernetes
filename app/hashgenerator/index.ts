import express from 'express'
import path from 'path'
import fs from 'fs'

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'hash.txt')

const app = express()
const port = process.env.port || 3003

const findAFile = async () => {
  await new Promise((res) => fs.mkdir(directory, (_err) => res()))

  await fs.writeFile(filePath, hashText, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('writing to file now')
  })
}

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()))

const randomHash = Math.random().toString(36)
let hashText = ''

const getHashNow = async () => {
  hashText = new Date().toISOString() + ' ' + randomHash
  console.log(hashText)
  await findAFile()
  setTimeout(getHashNow, 5000)
}

getHashNow()

app.get('/', (_req, res) => {
  res.send(hashText)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
