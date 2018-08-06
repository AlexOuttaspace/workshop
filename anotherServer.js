const fs = require('fs')
const express = require('express')
const app = express()

const PORT = process.env.PORT_2 || 3001

const json = fs.readFileSync('example.json')

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

app.get('/jsonp', (req, res) => {
  const { callback } = req.query;

  res.setHeader('Content-Type', 'application/javascript; charset')

  const json = fs.readFileSync('example.json').toString('utf8')

  const jsonWithCallback = `${callback}(${json})`

  res.status(200).send(jsonWithCallback)
})

app.listen(PORT, () => {
  console.log(`Another server is listening on port ${PORT}`)
})


function accept(req, res) {

  var urlParsed = url.parse(req.url, true);

  if (urlParsed.pathname == '/user') {
    var id = urlParsed.query.id;
    var callback = urlParsed.query.callback;

    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');

    var user = {
      name: "Вася",
      id: id
    };

    res.end(callback + '(' + JSON.stringify(user) + ')');

  } else {
    file.serve(req, res);
  }

}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}