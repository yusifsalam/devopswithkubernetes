const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'hash.txt')

let hashText = ''

const getFile = async () => {
  await fs.readFile(filePath, (err, data) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    hashText = data.toString()
    console.log('Current hash ', hashText)
  })

  setTimeout(getFile, 5000)
}

getFile()
