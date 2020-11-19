const axios = require('axios')

const main = async () => {
  const res = await axios.get('https://en.wikipedia.org/wiki/Special:Random')
  console.log('URL: ', res.request.res.responseUrl)
  const postres = await axios.post('http://project-svc:2345/api/todos', {
    text: `Read ${res.request.res.responseUrl}`,
  })
  console.log('postres', postres)
}

main()
