module.exports = app => {
  app.get('/api/pikachu', (req,res)=>{
    res.send('hello')
  });
  app.get('/api/pikachu/five', (req,res)=>{
    res.send('Juked SONNN')
  })
}
