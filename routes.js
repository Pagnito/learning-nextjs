const fs = require('fs');
const path = require('path');
const passpostSetup = require("./services/passport");
const pathTo = path.resolve(__dirname +'/static/gifs');
const passport = require("passport");
module.exports = (app) => {

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));
  app.get('/api/getGifs', (req,res)=>{
    let gifsArr = []
    fs.readdir(pathTo, (err,gifs)=>{
      let promise = new Promise((resolve,reject)=>{
        gifs.forEach(gif=>{
          fs.readFile(`${pathTo}/${gif}`,'utf-8', (err,data)=>{
            if (err) {
              throw err;
            } else {
              content = data;
              gifsArr.push(content)
              if(gifsArr.length===gifs.length){
                resolve()
              }
            }
          })
        })
      })
      promise.then(()=>{
        res.json(gifsArr);
      })

    })
  });
  app.get("/api/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });
  app.get('/api/getUser', (req,res)=>{
    res.json(req.user);
  })

  app.post('/upload', (req,res)=>{
    let imgObj = {
      name: req.body.name,
      image:req.body.img,
      user: req.user
    }
    let imgObjString = JSON.stringify(imgObj);
    fs.writeFile(`${pathTo}/${req.body.name}.json`, imgObjString, (err)=>{
      if( err ){
        throw err;
      } else {
        console.log('saved')
      }
    })
  })
}
