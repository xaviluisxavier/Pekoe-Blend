const express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, bodyParser=require('body-parser')
, path = require('path')
, app = express()
, port = 3000
, http = require('http')
, connection = require('./public/js/dbconnection')
, cons = require('consolidate')
, session = require('express-session');
require('dotenv').config()

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + './public/css'))
 app.use('/js', express.static(__dirname + './public/js'))
 app.use('/imagens', express.static(__dirname + './public/imagens'))
 app.use('/videos', express.static(__dirname + './public/imagens'))
app.use(express.static('./public'))
app.use('/chas',require('./routes/getChasRoutes'))
app.use('/tabela',require('./routes/getTabelaRoutes'))
app.use(session({
  secret: 'xavi123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 30 * 1000}
}))

app.get('/', user.login);
app.get('/registro', user.registro);//call for signup page
app.post('/registro', user.registro);//call for signup post 
app.post('/login', user.login);//call for login post
app.get('/home', user.home);
app.get('/home/logout', user.logout);//call for logout
app.get('/home/comprar', user.comprar);
app.get('/home/contacto', user.contacto);
app.get('/home/dashboard', user.dashboard);



app.get('/inicio', (req,res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})


app.listen(port, function(){
  console.log('Utilizando a Porta: ' + port)
})
console.log('Conectado à Base de Dados: ' + process.env._DATABASE)



