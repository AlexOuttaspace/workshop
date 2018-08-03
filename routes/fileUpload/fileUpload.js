const router = require('express').Router();


router.post('/upload', (req, res) => {
  let length = 0;
  req.on('data', (chunk) => {
    length += chunk.length;

  }).on('end', function () {
    res.send('file uploaded');
  });
})



module.exports = router;