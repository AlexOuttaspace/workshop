const path = require('path')
const express = require('express')
const app = express()

const simpleXHR = require('./routes/simpleXHR/simpleXHR')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.use('/xhr', simpleXHR)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})