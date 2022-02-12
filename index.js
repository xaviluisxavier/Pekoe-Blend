const express = require('express');
const bodyParser=require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const connection = require('./public/js/dbconnection')
require('dotenv').config()


app.use(express.static('./public'))
app.use('/chas',require('./routes/getChasRoutes'))
app.use('/tabela',require('./routes/getTabelaRoutes'))




app.get('/comprar', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/views/comprar.html'))
})


app.get('/home',(req,res) =>{
  res.sendFile(__dirname + '/public/views/home.html')
})


app.get('/login',(req,res) =>{
  res.sendFile(__dirname + '/public/views/login.html')
})


app.get('/dashboard',(req,res) =>{
  res.sendFile(__dirname + '/public/views/dashboard.html')
})
  

app.get('/contacto',(req,res) =>{
  res.sendFile(__dirname + '/public/views/contacto.html')
})





app.listen(port, function(){
  console.log('Utilizando a Porta: ' + port)
})
console.log('Conectado à Base de Dados: ' + process.env._DATABASE)




module.exports = app;
