const express = require('express');
const routes = require('./routes.js')
const next = require('next');
const path = require('path');
const passport = require('passport');
const favicon = require('serve-favicon');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });

const handle = nextApp.getRequestHandler();

nextApp.prepare()
.then(() => {
 //init userModel
 require('./user-model');
 //init mongodb
  mongoose.connect('mongodb://pagnito:gifferass8@ds155293.mlab.com:55293/giffer',
  { useNewUrlParser: true })
  .then(()=>{console.log('Connected to Mongo')})
  .catch(err=>{
    throw err;
  })
  const app = express();
  app.use(favicon(path.join(__dirname, 'static', 'favicon.png')))
  app.use(compression())
  app.use(bodyParser.json({limit: '4MB'}));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      maxAge: 168 * 60 * 60 * 1000,
      keys: ["asjdjfntwof"]
    })
  );

  ////initialize passport/////
  app.use(passport.initialize());
  app.use(passport.session());

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
