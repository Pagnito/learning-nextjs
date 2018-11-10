const path = require('path');
const fs = require('fs');
const util = require('util');
const pathTo = path.resolve(__dirname + '/static/gifs');

const readFile = util.promisify(fs.readFile);
    let responseArr = [];
    let promises = [];
    let objArr = [];


    fs.readdir(pathTo, (err,gifs)=>{
      let promise = new Promise((resolve,reject)=>{
        gifs.forEach(gif=>{
          fs.readFile(`${pathTo}/${gif}`,'utf-8', (err,data)=>{
            if (err) {
              throw err;
            } else {
              let gifObj = JSON.parse(data);
              objArr.push(gifObj);
              console.log(objArr.length, gifs.length)
              if(objArr.length===gifs.length){
                console.log('resolved')
                resolve();
              }
            }
          })
        })
      })
      promise.then(()=>{
        objArr.forEach(gif=>{
          if(gif.user){
            if(gif.user.fbId==='1388382347959918'){
              responseArr.push(gif)
            }
          }
          console.log('final arr', responseArr.length)
        })
      })
    })

/*    fs.readdir(pathTo, (err,gifs)=>{
      let promise = new Promise((resolve, reject)=>{
        let myGifs = gifs.map((gif,ind)=>{
          fs.readFile(`${pathTo}/${gif}`,'utf-8', (err,data)=>{
            if (err) {
              throw err;
            } else {
              let gifObj = JSON.parse(data);
              if(gifObj.user){
                if(gifObj.user.fbId===req.user.fbId){
                  responseArr.push(gifObj)
                }
              }
            }
          })
        })
        //how to resolve this?///
      })
      promise.then(()=>{
        res.json(responseArr);
      })
    })*/
