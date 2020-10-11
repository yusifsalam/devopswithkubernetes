const randomHash = Math.random().toString(36)

const getHashNow = () => {
  console.log(new Date().toISOString() + ' ' + randomHash)
  setTimeout(getHashNow, 5000)
}

getHashNow()
