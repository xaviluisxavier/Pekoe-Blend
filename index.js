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


app.use(express.static('./public'))


app.use('/chas',require('./routes/getChasRoutes'))
app.use('/tabela',require('./routes/getTabelaRoutes'))

app.use(session({
  secret: 'xavi123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 100 * 10} // 30 minutos 
}))

app.get('/', user.login);//chama a pagina de login
app.post('/login', user.login);//chama o  login post
app.get('/registro', user.registo);//chama a pagina de registro
app.post('/registro', user.registo);//chama o registro post
app.get('/home', user.home);//chama a pagina inicial após o login
app.get('/home/logout', user.logout);//faz o logout 
app.get('/home/comprar', user.comprar);//chama a pagina de comprar somente depois de ter feito o login
app.get('/home/contacto', user.contacto);//chama a pagina de contacto somente depois de ter feito o login
app.get('/home/dashboard', user.dashboard);//chama a pagina de dashboard somente depois de ter feito o login



app.get('/inicio', (req,res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})


app.listen(port, function(){
  console.log('Utilizando a Porta: ' + port)
})
console.log('Conectado à Base de Dados: ' + process.env._DATABASE)



