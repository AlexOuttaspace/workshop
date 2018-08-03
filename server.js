const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./anotherServer')

const simpleXHR = require('./routes/simpleXHR/simpleXHR')
const fileUpload = require('./routes/fileUpload/fileUpload')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.use('/xhr', simpleXHR)
app.use('/xhr', fileUpload)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})