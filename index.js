const express = require('express')
const path = require('path')
const ogParser = require("og-parser")
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    ogParser("http://www.bbc.com/news/world-europe-44289404", (error, data)=>{
      res.json(data)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
