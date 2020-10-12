import express from 'express'

const app = express()
const port = process.env.port || 3003

let pingCount = 0

app.get('/', (_req, res) => {
  pingCount++
  res.send(`pong ${pingCount}`)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
