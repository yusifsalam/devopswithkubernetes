const path = require('path')
const fs = require('fs')

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

  await fs.readFile(pingFilePath, (err, data) => {
    if (err) {
      return console.log('failed to read ping file ', err)
    }
    console.log('Ping / Pongs: ', data.toString())
  })

  setTimeout(getFile, 5000)
}

getFile()
