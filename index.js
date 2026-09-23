// 1. IMPORTAÇÕES
const express = require('express');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const path = require('path');
const cons = require('consolidate');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 3000;

// 2. CONFIGURAÇÕES BÁSICAS
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));

// 3. INICIAR A SESSÃO
app.use(session({
  secret: process.env._SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
        httpOnly: true,  
        sameSite: 'strict', 
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    } 
}));

// 4. O MIDDLEWARE
function checkAdmin(req, res, next) {
    if (req.session && req.session.userId && req.session.user && req.session.user.is_admin) {
        next();
    } else {
        console.log("Tentativa de acesso bloqueada!");
        res.status(403).json({ erro: "Acesso Negado. Apenas administradores podem executar esta ação." });
    }
}

// 5. AS ROTAS DA API
app.use('/chas', require('./routes/getChasRoutes'));
app.use('/efetuarCompra', require('./routes/efetuarCompraRoutes'));
app.use('/toggleFavorito', require('./routes/toggleFavoritoRoutes'));

// Rotas Protegidas
app.use('/adicionarchas', checkAdmin, require('./routes/addChasRoutes'));
app.use('/update', checkAdmin, require('./routes/updateChasRoutes'));
app.use('/remove', checkAdmin, require('./routes/removeChasRoutes'));
app.use('/users', checkAdmin, require('./routes/getUserRoutes'));
app.use('/updateuser', checkAdmin, require('./routes/updateUserRoutes'));
app.use('/removeuser', checkAdmin, require('./routes/removeUserRoutes'));
app.use('/encomendas', checkAdmin, require('./routes/getEncomendasRoutes'));
app.use('/updateestado', checkAdmin, require('./routes/updateEstadoEncomendaRoutes'));


// 6. AS ROTAS DAS PÁGINAS HTML
app.get('/login', user.login);
app.post('/login', user.login);
app.get('/registo', user.registo);
app.post('/registo', user.registo);
app.get('/inicio', user.home);
app.get('/logout', user.logout);
app.get('/comprar', user.comprar);
app.get('/contacto', user.contacto);
app.post('/enviar-contacto', user.enviarContacto);
app.get('/dashboard', user.dashboard);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

// 7. INICIAR O SERVIDOR
app.listen(port, function () {
  console.log('Utilizando a Porta: ' + port);
});
console.log('Conectado à Base de Dados: ' + process.env._DATABASE);
