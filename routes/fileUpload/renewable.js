const router = require('express').Router();
const fs = require('fs')

const uploads = {}

router.post('/renewable/upload', (req, res) => {
  const fileId = req.headers['x-file-id'];
  const startByte = req.headers['x-start-byte'];




  if (!fileId) {
    console.log('[Error]: fileId header not found')
    res.writeHead(400, "No file id");
    res.end();
  }

  const filePath = '/dev/null';

  let upload, fileStream;

  if (uploads[fileId]) { // if file was alredy in upload

    console.log(`
      [Upload request][Old]: fileId = ${fileId}, startByte = ${startByte}.
    `)
    upload = uploads[fileId]

    if (upload.bytesReceived != startByte) {
      console.log(upload.bytesReceiver, startByte)
      res.writeHead(400, "Wrong start byte");
      res.end(`${upload.bytesReceived}`);
      return;
    }

    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });

  } else { // if file is new
    console.log(`
      [Upload request][New]: fileId = ${fileId}, startByte = ${startByte}.
    `)

    uploads[fileId] = upload = { bytesReceived: 0, startByte: 0 };

    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
  }

  req.on('data', function (data) {
    upload.bytesReceived += data.length;
  });

  req.pipe(fileStream);

  fileStream.on('close', function () {
    if (upload.bytesReceived === +req.headers['x-file-size']) {
      delete uploads[fileId];
      res.end("Success " + upload.bytesReceived);
    } else {
      res.end();
    }
  });

  fileStream.on('error', function (err) {
    res.writeHead(500, "File error");
    res.end();
  });
})

router.get('/renewable/status', (req, res) => {
  const fileId = req.headers['x-file-id'];
  const upload = uploads[fileId];

  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }

})



module.exports = router;