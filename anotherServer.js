const express = require('express')
const app = express()

const PORT = process.env.PORT_2 || 3001


app.get('/cors', (req, res) => {
  res.send('success')
})

app.options('/no-cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization')
  res.send();
})

app.get('/no-cors', (req, res) => {
  res.send('success')
})

app.listen(PORT, () => {
  console.log(`Another server is listening on port ${PORT}`)
})