const fs = require('fs');
const path = require('path');
const http = require('http');
const nunjucks = require('nunjucks');

const port = 3000;
const title = 'Just a demo!'

nunjucks.configure('.', { autoescape: true });

const server = http.createServer((req, res) => {
  const assets = require('../build/assets.json');
  const html = nunjucks.render('index.html', {
    title,
    assets,
   });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html);
  res.end();
});

server.listen(port, () => {
  console.log('PROCESS START AT ' + new Date());
  console.info('Server running in %s on port %s', process.env.NODE_ENV.toUpperCase(), port);
});
