import express from 'express'
import path from 'path'
import fs from 'fs'
import { Client } from 'pg'

const app = express()
const port = process.env.port || 3003
const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
})

client.connect()
client.query(`create table if not exists pings (id int4, pongs integer);`)
client.query(
  `insert into pings(id, pongs) select 1, 0 where not exists (select 1 from pings where id = 1)`
)

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
    client.query(`update pings set pongs = ${pingCount} where id = 1;`)
  })
}

app.get('/', async (_req, res) => {
  pingCount++
  await findAFile()
  res.send(`pong ${pingCount}`)
})

app.get('/num', async (_req, res) => {
  const result = await client.query(`select * from pings`)
  console.log('result', result.rows[0].pongs)
  res.json(`pong ${pingCount}`)
})

app.listen(port, async () => {
  await getFile()
  console.log(`server started on port ${port}`)
})
