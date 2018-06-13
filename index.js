const express = require('express')
const path = require('path')
const ogParser = require("og-parser")
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
    })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    ogParser(req.query.url || 'https://www.letananarivien.com', (error, data)=>{
        data.favicon = `http://www.google.com/s2/favicons?domain=${data.og?data.og.site_name:res.query.url}`
        data.title = data.title
        data.description = data.og ? data.og.description : (data.twitter ? data.twitter.description : (data.meta ? data.meta.description : ''))
        data.img = data.og ? data.og.image.url : (data.twitter ? data.twitter.image : '')
        data.url = data.og ? data.og.url : (data.twitter ? data.twitter.url : (data.meta ? data.meta.url : ''))
      res.json(data)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
