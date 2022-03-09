const express = require('express')
  , user = require('./routes/user')
  , bodyParser = require('body-parser')
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


app.use('/chas', require('./routes/getChasRoutes'))
app.use('/adicionarchas', require('./routes/addChasRoutes'))
app.use('/users', require('./routes/getTabelaRoutes'))
app.use('/update', require('./routes/updateChasRoutes'))
app.use('/updateuser', require('./routes/updateUserRoutes'))
app.use('/remove', require('./routes/removeChasRoutes'))
app.use('/removeuser', require('./routes/removeUserRoutes'))


app.use(session({
  secret: process.env._SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 100 * 10 } // 30 minutos 
}))

app.get('/', user.login);
app.post('/login', user.login);
app.get('/registo', user.registo);
app.post('/registo', user.registo);
app.get('/home', user.home);
app.get('/home/logout', user.logout);
app.get('/home/comprar', user.comprar);
app.get('/home/contacto', user.contacto);
app.get('/home/dashboard', user.dashboard);



app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})


app.listen(port, function () {
  console.log('Utilizando a Porta: ' + port)
})
console.log('Conectado à Base de Dados: ' + process.env._DATABASE)



