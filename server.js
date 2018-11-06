const express = require('express');
const routes = require('./routes.js')
const next = require('next');
const bodyParser = require('body-parser');
const compression = require('compression');
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare()
.then(() => {
  const app = express();
  app.use(compression())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  routes(app);
  app.get('*', (req, res) => {
    return handle(req, res)
  })


  app.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
