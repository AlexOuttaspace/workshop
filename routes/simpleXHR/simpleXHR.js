const router = require('express').Router();
const path = require('path')
const multer = require('multer')
const upload = multer()

const sleep = require('../../sleep')

router.get('/simpleXHR', async (req, res) => {
  await sleep(500)
  res.setHeader('Content-type', 'application/json')
  res.status(200).sendFile(path.join(__dirname, 'example.json'))
})

router.get('/showState', async (req, res) => {
  const timer = setInterval(write, 1000);
  let i = 0;
  write();

  function write() {
    res.write(new Array(1000).join(++i + '') + ' ');
    if (i === 5) {
      clearInterval(timer);
      res.end();
    }
  }
})

router.get('/encription/urlencoded', (req, res) => {
  res.status(200).send(req.query)
})

router.post('/encription/urlencoded', (req, res) => {
  res.status(200).send(req.body)
})

router.post('/encription/multipart-formdata', upload.array(), (req, res) => {
  res.status(200).send(req.body)
})

module.exports = router;