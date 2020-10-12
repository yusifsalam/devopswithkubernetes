import express from 'express'

const app = express()
const port = process.env.port || 3003

const randomHash = Math.random().toString(36)
let hashText = ''

const getHashNow = () => {
  hashText = new Date().toISOString() + ' ' + randomHash
  console.log(hashText)
  setTimeout(getHashNow, 5000)
}

getHashNow()

app.get('/', (_req, res) => {
  res.send(hashText)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
