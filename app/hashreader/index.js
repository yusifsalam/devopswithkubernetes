const path = require('path')
const fs = require('fs')
const axios = require('axios')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const hashFilePath = path.join(directory, 'hash.txt')
const pingFilePath = path.join(directory, 'ping.txt')

let hashText = ''

const getFile = async () => {
  await fs.readFile(hashFilePath, (err, data) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    hashText = data.toString()
    console.log('Current hash ', hashText)
  })

  const pongs = await axios
    .get('http://pingpong-svc:2345/num')
    .catch((error) => console.error(error))
  console.log('Ping / Pongs: ', pongs.data)

  setTimeout(getFile, 5000)
}

getFile()
