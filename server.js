const path = require('path')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const simpleXHR = require('./routes/simpleXHR/simpleXHR')
const fileUpload = require('./routes/fileUpload/fileUpload')
const renewableUpload = require('./routes/fileUpload/renewable')
const serverSentEvents = require('./routes/serverSentEvents/sse')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.use('/xhr', simpleXHR)
app.use('/xhr', fileUpload)
app.use('/xhr', renewableUpload)
app.use('/sse', serverSentEvents)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// require('./anotherServer')
require('./websocket')


// HTTP-запрос  _done
// AJAX _done
// Fetch _only in presentation
// Кросс-доменные запросы _done
// COMET _only in presentation
// Long calls ?
// Server-Side Events
// WebSocket _done
// IFRAME