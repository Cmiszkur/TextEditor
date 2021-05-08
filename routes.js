const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

router.post('/save', (req, res) => {

    const content = req.body.content
    const title = req.body.title
    const JSONresponse = {
        title: title,
        content: content
    }
    const fileName = path.join(__dirname, "./JSONfiles/" + title + ".json")

    fs.writeFile(fileName, JSON.stringify(JSONresponse), err => {
        if (err) {
            console.log(err)
        }
    })

    console.log(req.body)
    res.redirect('/')

})

router.get('/readFiles', (req, res) => {
    const dirname = path.join(__dirname, "./JSONfiles")
    const response = []
    
    fs.readdir(dirname, (err, files) => {
        
        if (err) {
            return console.log(err)
          }
        
        files.forEach((file, index, array) => {
            let data = fs.readFileSync(dirname + '/' + file, 'utf-8')
            response.push(JSON.parse(data))
            console.log(data)

            if(index == array.length - 1){
                console.log(response)
                res.send(response)
            }
        })
    })
  })

module.exports = router