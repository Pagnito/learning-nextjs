const path = require('path');
const fs = require('fs');
let pathTo = path.resolve(__dirname + '/static/gifs/image.json');
let content = 'hoe'
fs.writeFile(pathTo, content, (err)=>{
  if( err ){
    throw err;
  } else {
    console.log('saved')
  }
})
