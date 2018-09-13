const router = require('express').Router();

router.get('/subscribe', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  let i = 0;

  const timer = setInterval(() => {
    i++;

    if (i == 4) {
      res.write('event: bye\ndata: до свидания\n\n');
      clearInterval(timer);
      res.end();
      return;
    }

    res.write('data: ' + i + '\n\n');

  }, 1000);
})

module.exports = router;