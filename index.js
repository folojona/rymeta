const express = require('express')
const path = require('path')
const ogParser = require("og-parser")
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    ogParser(req.query.url || 'https://www.letananarivien.com', (error, data)=>{
      res.json(data)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
