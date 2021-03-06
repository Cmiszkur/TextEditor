const express = require('express')
const app = express()
const port = 3000
const path = require('path')

var router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(express.static(path.join(__dirname))) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})