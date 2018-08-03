const router = require('express').Router();
const fs = require('fs')

const uploads = {}

router.post('/renewable/upload', (req, res) => {
  const fileId = req.headers['x-file-id'];
  const startByte = req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  const filePath = '/dev/null';

  console.log("onUpload fileId: ", fileId);

  if (!uploads[fileId]) uploads[fileId] = {};
  const upload = uploads[fileId];

  console.log("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  if (startByte === 0) {
    upload.bytesReceived = 0;
    const fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    console.log("New file created: " + filePath);
  } else {
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    console.log("File reopened: " + filePath);
  }


  req.on('data', function (data) {
    upload.bytesReceived += data.length;
  });

  req.pipe(fileStream);


  fileStream.on('close', function () {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      console.log("File finished");
      delete uploads[fileId];


      res.end("Success " + upload.bytesReceived);
    } else {
      console.log("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  fileStream.on('error', function (err) {
    console.log("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });
})

router.post('/renewable/status', (req, res) => {
  let length = 0;
  req.on('data', (chunk) => {
    length += chunk.length;
    console.log('KBytes uploaded:', length / 1024)
  }).on('end', function () {
    res.send('file uploaded');
  });
})



module.exports = router;